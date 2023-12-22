import {
  ButtonHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from 'react';
//styles
import styles from './Styles.module.scss';

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
    <button className={styles.button} style={_style} {...rest}>
      {children}
    </button>
  );
};
