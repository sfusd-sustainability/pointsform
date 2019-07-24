import React from 'react'
import { Layout } from 'eded-theme'
import { Input } from '../components/form_components'
import styled from 'styled-components'
import styles from '../styles'

const StyledForm = styled.div`
  & > * {
    margin-bottom: 2rem;
  }
  & > :last-child {
    margin-bottom: 0;
  }
  background-color: #f4f4f4;
  padding: 3rem;
  border-radius: 2rem;
  filter: ${styles.filter};
  margin: 2rem 1rem 1rem;
`;

class Index extends React.Component {
  render() {
    return (
      <Layout title={"Points Reporting Form"}>
        <StyledForm>
          <Input type="text" />
          <Input type="number" />
          <Input type="textarea" />
          <Input type="radio" />
          <Input type="select" />
          <Input type="image" />
          <button>Submit</button>
        </StyledForm>
      </Layout>
    );
  }
}

export default Index;
