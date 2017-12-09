import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  padding:0px 25px 0px 25px;
  margin: 0px 10px 0px 10px;
  text-align: center;
  vertical-align: middle;
  width:125px;
  border-radius:5px;
  -moz-border-radius:5px;
  -webkit-border-radius:5px;
  border:1px solid #cccccc;

  &:hover {
    background:#cccccc;
    color:white;
    cursor:pointer;
  }

  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
`;

var styles = {
  isSelected: {
    'background':'#cccccc',
    'color':'white'
  },

  none: {
  }
};

class FilterItem extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.state = {
      isSelected: false
    }
  }

  onClick() {
    this.setState({['isSelected'] : !this.state.isSelected});
  }

  render() {
    if (this.props.name != null) {
      return(
        <Container onClick={this.onClick} style={this.state.isSelected ? styles.isSelected : styles.none}>
          {this.props.name}
        </Container>
      );
    }

    // Return an empty div if the prop has no name
    return(
      <div></div>
    );
  }
}

export default FilterItem;
