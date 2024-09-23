import {
  Dispatch,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { CSSObject } from '@emotion/react';
import {
  inputIconStyle,
  inputContainerStyle,
  inputStyle, labelStyle,
} from '@components/input/styles';
import toggleShowIcon from '@assets/icons/eye.svg';
import toggleHideIcon from '@assets/icons/eye-off.svg';
import { generateRandomId } from '@/utils';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  icon?: string | ReactNode;
  enableToggleShow?: boolean;
  type: HTMLInputTypeAttribute;
  label?: string;
  css?: CSSObject;
}

function Input({
  icon, enableToggleShow, type, label, css, ...rest
}: InputProps) {
  const inputId = useRef(generateRandomId());
  const [isHidden, setIsHidden] = useState(true);

  if (enableToggleShow && type !== 'password') {
    throw new Error('Cannot enable toggle while the type of input is not password');
  }

  return (
    <>
      {
        label
          ? (
            <label htmlFor={inputId.current} css={labelStyle}>
              <p>{label}</p>
            </label>
          )
          : null
      }
      <div css={inputContainerStyle}>
        <InputIcon icon={icon} />
        <input
          id={inputId.current}
          css={[inputStyle(!!icon, enableToggleShow), css]}
          type={type === 'password' && isHidden
            ? 'password'
            : 'text'}
          {...rest}
        />
        {
        enableToggleShow
          ? <ToggleVisibilityIcon isHidden={isHidden} setIsHidden={setIsHidden} />
          : null
      }
      </div>
    </>
  );
}

interface ToggleVisibilityIconProps {
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>
}

function ToggleVisibilityIcon({
  isHidden,
  setIsHidden,
}: ToggleVisibilityIconProps) {
  return (
    <img
      src={isHidden ? toggleShowIcon : toggleHideIcon}
      alt="toggle show"
      css={inputIconStyle(true)}
      onClick={() => setIsHidden((prevState: boolean) => !prevState)}
      role="presentation"
    />
  );
}

function InputIcon({ icon }: Partial<InputProps>) {
  if (!icon) {
    return null;
  }

  if (typeof icon === 'string') {
    return <img src={icon} alt="input icon" css={inputIconStyle()} />;
  }

  return icon;
}

export default Input;
