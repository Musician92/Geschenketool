import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
} from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
  type,
  register,
  handleSubmit,
  formLoading,
  onFinishHandler,
}: FormProps) => {
  return (
      <Box>
          <Typography fontSize={25} fontWeight={700} color="#11142d">
              {type} ein Geschenk
          </Typography>

          <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
              <form
                  style={{
                      marginTop: "20px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                  }}
                  onSubmit={handleSubmit(onFinishHandler)}
              >
                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >
                          Geschenknamen eingeben
                      </FormHelperText>
                      <TextField
                          fullWidth
                          required
                          id="outlined-basic"
                          color="info"
                          variant="outlined"
                          {...register("title", { required: true })}
                      />
                  </FormControl>
                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >
                          Link eingeben
                      </FormHelperText>
                      <TextField
                          fullWidth
                          required
                          id="outlined-basic"
                          color="info"
                          variant="outlined"
                          {...register("link", { required: true })}
                      />
                  </FormControl>
                  <FormControl>
                      <FormHelperText
                          sx={{
                              fontWeight: 500,
                              margin: "10px 0",
                              fontSize: 16,
                              color: "#11142d",
                          }}
                      >
                          Beschreibung eingeben
                      </FormHelperText>
                      <TextareaAutosize
                          minRows={5}
                          required
                          placeholder="Beschreibung..."
                          color="info"
                          style={{
                              width: "100%",
                              background: "transparent",
                              fontSize: "16px",
                              borderColor: "rgba(0,0,0,0.23)",
                              borderRadius: 6,
                              padding: 10,
                              color: "#919191",
                          }}
                          {...register("description", { required: true })}
                      />
                  </FormControl>

                  <Stack direction="row" gap={4}>
                      <FormControl sx={{ flex: 1 }}>
                          <FormHelperText
                              sx={{
                                  fontWeight: 500,
                                  margin: "10px 0",
                                  fontSize: 16,
                                  color: "#11142d",
                              }}
                          >
                              Geschenkkategorie auswählen
                          </FormHelperText>
                          <Select
                              variant="outlined"
                              color="info"
                              displayEmpty
                              required
                              inputProps={{ "aria-label": "Without label" }}
                              defaultValue="aparment"
                              {...register("presentType", {
                                  required: true,
                              })}
                          >
                              <MenuItem value="tech">Tech</MenuItem>
                              <MenuItem value="beauty">Beauty</MenuItem>
                              <MenuItem value="nerd">Nerd</MenuItem>
                              <MenuItem value="game">Game</MenuItem>
                              <MenuItem value="game">Art</MenuItem>
                              <MenuItem value="others">Others</MenuItem>
                          </Select>
                      </FormControl>
                      <FormControl>
                          <FormHelperText
                              sx={{
                                  fontWeight: 500,
                                  margin: "10px 0",
                                  fontSize: 16,
                                  color: "#11142d",
                              }}
                          >
                              Preis eingeben
                          </FormHelperText>
                          <TextField
                              fullWidth
                              required
                              id="outlined-basic"
                              color="info"
                              type="number"
                              variant="outlined"
                              {...register("price", { required: true })}
                          />
                      </FormControl>
                  </Stack>
                  <CustomButton
                      type="submit"
                      title={formLoading ? "Am Senden, Du Bits..." : "Senden"}
                      backgroundColor="#475be8"
                      color="#fcfcfc"
                  />
              </form>
          </Box>
      </Box>
  );
};

export default Form;