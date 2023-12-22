import {
  ButtonHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from 'react';
//styles
import './Styles.scss';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  backgroundColor?: string;
  color?: string;
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  backgroundColor,
  color,
  style,
  ...rest
}) => {
  let _style: CSSProperties = style || {};

  /** Override Defaults **/
  if (backgroundColor) _style.backgroundColor = backgroundColor;
  if (color) _style.color = color;

  return (
    <button className="button" style={_style} {...rest}>
      {children}
    </button>
  );
};
