import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    presentType: string,
    link: string,
    price: number | undefined,
}

export interface PresentCardProps {
  id?: BaseKey | undefined,
  title: string,
  price: string,
}
