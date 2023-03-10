import Present from "../mongodb/models/presents.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";


dotenv.config();

function parseJwt (token) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

const getAllPresents = async (req, res) => {

    const token = req.headers.authorization
    const profileObj = token ? parseJwt(token) : null;
    console.log(profileObj)


    if (!profileObj?.name){
        req.status(401).json({ message: "Not Authorized" })
        return
    }
    
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        presentType = "",
    } = req.query;

    
    const query = {};

    query.person = { $ne: profileObj.given_name.toLowerCase() };
  

    if (presentType !== "") {
        query.presentType = presentType;
    }

    if (title_like) {
        query.title = { $regex: title_like, $options: "i" };
    }


    try {
        const count = await Present.countDocuments({ query });
        
        const presents = await Present.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });
        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(presents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    };

const getPresentDetail = async (req, res) => {

    const token = req.headers.authorization
    const profileObj = token ? parseJwt(token) : null;

    if (!profileObj?.name){
        req.status(401).json({ message: "Not Authorized" })
        return
    }


    const { id } = req.params;
    const presentExists = await Present.findOne({ _id: id }).populate(
        "creator",
    );

    if (presentExists) {
        res.status(200).json(presentExists);
    } else {
        res.status(404).json({ message: "Present not found" });
    }
};

const createPresent = async (req, res) => {
    const token = req.headers.authorization
    const profileObj = token ? parseJwt(token) : null;

    if (!profileObj?.name){
        req.status(401).json({ message: "Not Authorized" })
        return
    }

    try {
        const {
            title,
            description,
            presentType,
            price,
            link,
            email,
            person,
            date,
        } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");


        const newPresent = await Present.create({
            title,
            description,
            presentType,
            price,
            link,
            person,
            date,
            creator: user._id,
        });

        user.allPresents.push(newPresent._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Present created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePresent = async (req, res) => {

    const token = req.headers.authorization
    const profileObj = token ? parseJwt(token) : null;

    if (!profileObj?.name){
        req.status(401).json({ message: "Not Authorized" })
        return
    }

    try {
        const { id } = req.params;
        const { title, description, presentType, price} =
            req.body;

        await Present.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                presentType,
                price,
                link,
                person,
                date,
            },
        );

        res.status(200).json({ message: "Present updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePresent = async (req, res) => {

    const token = req.headers.authorization
    const profileObj = token ? parseJwt(token) : null;

    if (!profileObj?.name){
        req.status(401).json({ message: "Not Authorized" })
        return
    }

    try {
        const { id } = req.params;

        const presentToDelete = await Present.findById({ _id: id }).populate(
            "creator",
        );

        if (!presentToDelete) throw new Error("Present not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        presentToDelete.remove({ session });
        presentToDelete.creator.allPresents.pull(presentToDelete);

        await presentToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Present deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllPresents,
    getPresentDetail,
    createPresent,
    updatePresent,
    deletePresent,
};