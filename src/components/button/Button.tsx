import {
  ButtonHTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  FC,
  PropsWithChildren,
} from 'react';
//styles
import styles from './Styles.module.scss';

export interface ButtonProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
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
  const _style: CSSProperties = {
    ...style,
    ...(backgroundColor && { backgroundColor }),
    ...(color && { color }),
  };

  return (
    <button className={styles.button} style={_style} {...rest}>
      {children}
    </button>
  );
};
