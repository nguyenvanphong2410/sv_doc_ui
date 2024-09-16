import React, {useState} from 'react';
import styles from './styles.module.scss';
import {classNames} from '@/utils/helper';
import _ from 'lodash';

function FloatLabel(props) {
  const [defaultFocus, setDefaultFocus] = useState(false);
  const {className, focus: customFocus, onBlur, onFocus, htmlFor, ..._props} = props;

  const labelName = props.label || props.children.props.placeholder;
  const value = props.children.props.value;

  const focus = _.isUndefined(customFocus) ? defaultFocus : customFocus;

  return (
    <div
      className={classNames(styles.floatLabel, focus || value ? 'float' : '', className)}
      onBlur={() => {
        setDefaultFocus(false);
        onBlur && onBlur();
      }}
      onFocus={() => {
        setDefaultFocus(true);
        onFocus && onFocus();
      }}
      {..._props}
    >
      {props.children}
      <label htmlFor={htmlFor}>{labelName}</label>
    </div>
  );
}

export default FloatLabel;
