import React from 'react';
import InlineSVG from 'react-inlinesvg';
import IconWarning from '@/assets/images/icons/light/warning.svg';

function ErrorMessage(props) {
  const {message, ..._props} = props;
  return (
    message &&
    message.length > 0 && (
      <span className={'error'} {..._props}>
        <div className={'icon'}>
          <InlineSVG src={IconWarning} width={14} height={14} />
        </div>
        {message}
      </span>
    )
  );
}

export default ErrorMessage;
