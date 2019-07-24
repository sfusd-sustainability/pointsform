import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import styles from '../styles'
import { RadioGroup, RadioButton } from 'react-radio-buttons'
import ImageInput from './imageinput'

const Wrapper = styled.div`
  span {
    color: red;
  }
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: .6rem;
    text-transform: capitalize;
  }
`;
const StyledRadioGroup = styled(RadioGroup)`
  & > * {
    color: ${styles.color} !important;
    border: none !important;
    background-color: #fff;
    border-radius: ${styles.borderRadius} !important;
    filter: ${styles.filter};
  }
  & > :last-child {
    margin-bottom: 0 !important;
  }
  & > * > * {
    flex-direction: row-reverse !important;
  }
  & > * > * > *:last-child {
    margin-right: 1rem !important;
    border: 1.5px solid ${styles.color} !important;
  }
  & > * > * > *:last-child > * {
    background: ${styles.color} !important;
  }
`
const StyledInput = styled.input`
  font-size: 1rem;
  padding: 1rem;
  color: ${styles.color} !important;
  border: none !important;
  background-color: #fff;
  border-radius: ${styles.borderRadius} !important;
  filter: ${styles.filter};
`;
const StyledTextarea = styled.textarea`
  font-family: Roboto;
  resize: vertical;
  font-size: 1rem;
  padding: 1rem;
  color: ${styles.color} !important;
  border: none !important;
  background-color: #fff;
  border-radius: ${styles.borderRadius} !important;
  filter: ${styles.filter};
`;
const selectStyles = {
  control: () => ({
    display: 'flex',
    borderRadius: styles.borderRadius,
    backgroundColor: '#fff',
    padding: '.4rem',
    filter: styles.filter
  }),
  input: () => ({
    color: styles.color
  })
};

class Input extends React.Component {
  constructor() {
    super();
    this.defaultCallback = (name, value) => {
      console.log(`${name}: "${value}"`);
    };
    this.inputChange = this.inputChange.bind(this);
  }
  inputChange(e) {
    let name = this.props.name || "default";
    let callback = this.props.handler || this.defaultCallback;
    if (typeof e === 'string')
      callback(name, e);
    else
      callback(name, e.target.value);
  }

  render () {
    const name = this.props.name || "default";
    let formInput;
    switch (this.props.type) {
      case 'select':
        formInput = (
          <Select
            onChange={this.inputChange}
            styles={selectStyles}
            aria-labelledby={name} />
        );
        break;
      case 'radio':
        formInput = (
          <StyledRadioGroup
            onChange={this.inputChange}
            id={name}>
            {this.props.options && this.props.options.length > 1
              ? this.props.options.map((option) => {
                return (
                  <RadioButton value={option.value}>
                    {option.name}
                  </RadioButton>
                );
              }) : [
                <RadioButton
                  key="default1"
                  value="default1">
                  Default 1
                </RadioButton>,
                <RadioButton
                  key="default2"
                  value="default2">
                  Default 2
                </RadioButton>
              ]}
          </StyledRadioGroup>
        );
        break;
      case 'textarea':
        formInput = (
          <StyledTextarea
            id={name}
            onChange={this.inputChange} />
        );
        break;
      case 'number':
        formInput = (
          <StyledInput
            type="number"
            id={name}
            onChange={this.inputChange} />
        )
        break;
      default:
        formInput = (
          <StyledInput
            type="text"
            id={name}
            onChange={this.inputChange} />
        );
    }
    //Image input
    if (this.props.type === 'image')
      return (<ImageInput name={"image"} onChange={this.inputChange} />);
    return (
      <Wrapper>
        <label
          id={name}
          htmlFor={name}>
          {this.props.name || (this.props.type || "text")+" input"}
          {this.props.required && <span> *</span>}
        </label>
        {formInput}
      </Wrapper>
    );
  }
}

export { Input, StyledInput };
