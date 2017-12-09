import React from 'react';
import styled from 'styled-components';


class StudentView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="btn-group btn-group-justified">
                <div class="btn-group">
                    <input type="checkbox"> Show Tests </input>
                </div>
                <div class="btn-group">
                    <input type="checkbox"> Show Quizzes  </input>
                </div>
                <div class="btn-group">
                    <input type="checkbox"> Show Projects  </input>
                </div>
                <div class="btn-group">
                    <input type="checkbox"> Show Class Schedule  </input>
                </div>
                <div class="btn-group">
                    <SearchBar
                        noIcon
                        onChangeText={someMethod}
                        placeholder='Type Here...' >
                        searchbar should go here
                    </SearchBar>
                </div>
            </div>
        );
    }
}

export default StudentView;
