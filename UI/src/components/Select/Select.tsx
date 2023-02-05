import { ColourOption } from '../../docs/data.ts';
import { StylesConfig } from 'react-select'
import chroma from 'chroma-js';

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

const colourStyles: StylesConfig<ColourOption> = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma("black");
      return {
        ...styles,
        backgroundColor: isDisabled ? undefined : 
                         isSelected ? '#1BB262' : 
                         isFocused ? color.alpha(0.1).css() : undefined,
        color: 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#1BB262') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot('#1BB262') }),
  };

export default colourStyles;