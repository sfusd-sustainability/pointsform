import React from 'react'
import { StyledInput } from './form_components'
import styled from 'styled-components'
import styles from '../styles'

const StyledThumbnail = styled.div`
  width: 45%;
  display: flex;
  flex-direction: row;
  height: 4rem;
  background-color: #EBEBEB;
  filter: ${styles.filter};
  box-sizing: border-box;
  color: ${styles.color};
  & img {
    height: 100%;
    width: 5rem;
    object-fit: cover;
  }
  & p {
    box-sizing: border-box;
    padding: .5rem;
    padding-right: 0;
    font-size: .9rem;
    font-weight: bold;
    word-wrap: break-word;
    overflow: hidden;
    letter-spacing: 2px;
    flex: 1;
  }
  & svg {
    align-self: flex-start;
    height: 22px;
    width: 22px;
    justify-self: right;
    margin: .4rem .4rem auto auto;
    margin-left: auto;
    color: ${styles.color};
  }
`;
const ImageWrapper = styled.div`
  padding: 2rem;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  & > * {
    margin: auto;
    margin-bottom: 1rem;
  }
`;

class ImageInput extends React.Component {
  constructor () {
    super();
    this.state = {images:[]};
    this.onChange = this.onChange.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }
  removeImage (name) {
    let images = this.state.images;
    images = images.filter((i)=>i.name!==name);
    this.setState({images});
  }
  onChange (e) {
    //Do custom stuff
    // this.props.onChange(e);
    let images = e.target.files;
    if (typeof window !== undefined){
      for (let img of images){
        if (!img.type.includes('image/')) return;
        let url = window.URL.createObjectURL(img);
        let imagesState = this.state.images;
        if (imagesState.every(i => i.name !== img.name)){
          imagesState.push({url, name: img.name, raw: img});
          this.setState({images: imagesState, err: undefined});
        } else {
          this.setState({err: `Cannot upload two images with the same
            filename`});
        }
      }
    }
    e.target.files = undefined;
  }
  render () {
    return (
      <div>
        <StyledInput
          as='label'
          htmlFor={this.props.name}
          style={{display: 'block', marginBottom: '1rem'}}>
          ADD PHOTO
        </StyledInput>
        <input
          type='file'
          accept="image/*"
          id={this.props.name}
          multiple
          onChange={this.onChange}
          style={{opacity:0, width:0, height:0}} />
        {this.state.err && (
          <p style={{color: 'red'}}>
            <b style={{letterSpacing: 1}}>Error:</b>
            {" "+this.state.err}
          </p>
        )}
        <ImageWrapper>
          {this.state.images.map(img => {
            return (
              <ImageThumbnail
                key={img.url}
                name={img.name}
                removeHandler={this.removeImage}
                url={img.url} />
            );
          })}
        </ImageWrapper>
      </div>
    );
  }
}

class ImageThumbnail extends React.Component {
  removeSelf () {
    this.props.removeHandler(this.props.name);
  }
  render () {
    return (
      <StyledThumbnail>
        <img
          src={this.props.url}
          alt={this.props.name} />
        <p>
          {this.props.name.toUpperCase()}
        </p>
        <svg onClick={this.removeSelf.bind(this)} width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 0.546875C8.13477 0.546875 0.546875 8.13477 0.546875 17.5C0.546875 26.8652 8.13477 34.4531 17.5 34.4531C26.8652 34.4531 34.4531 26.8652 34.4531 17.5C34.4531 8.13477 26.8652 0.546875 17.5 0.546875ZM17.5 31.1719C9.94629 31.1719 3.82812 25.0537 3.82812 17.5C3.82812 9.94629 9.94629 3.82812 17.5 3.82812C25.0537 3.82812 31.1719 9.94629 31.1719 17.5C31.1719 25.0537 25.0537 31.1719 17.5 31.1719ZM24.459 13.248L20.207 17.5L24.459 21.752C24.7803 22.0732 24.7803 22.5928 24.459 22.9141L22.9141 24.459C22.5928 24.7803 22.0732 24.7803 21.752 24.459L17.5 20.207L13.248 24.459C12.9268 24.7803 12.4072 24.7803 12.0859 24.459L10.541 22.9141C10.2197 22.5928 10.2197 22.0732 10.541 21.752L14.793 17.5L10.541 13.248C10.2197 12.9268 10.2197 12.4072 10.541 12.0859L12.0859 10.541C12.4072 10.2197 12.9268 10.2197 13.248 10.541L17.5 14.793L21.752 10.541C22.0732 10.2197 22.5928 10.2197 22.9141 10.541L24.459 12.0859C24.7803 12.4072 24.7803 12.9268 24.459 13.248Z" fill="#353535"/></svg>
      </StyledThumbnail>
    );
  }
}

export default ImageInput;
