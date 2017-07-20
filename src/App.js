import React, { Component } from 'react';
import DOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import Autocomplete from '../node_modules/react-autocomplete/build/lib/index'
import {comics,getComics,submitSelection} from './util'

class App extends Component {
	state = {
		value: "Enter the series here",
		comics: comics(),
		latestIssue: {
			title: '',
			description: '',
			image: '',
			price: ''
		}
}

	requestTimer = null

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the Marvel comic book database</h2>
        </div>
        <p className="App-intro">
          Simply type a comic book series into the field below and the app will show you the latest publication in the series – or a list of series' matching your input.
        </p>
	    <div className="App-selection">
			<label htmlFor="comic-autocomplete">Enter/Select a comic series</label><br />
			<Autocomplete
				getItemValue={(item) => item.label}
				value = {this.state.value}
				inputProps = {{ id: 'comic-autocomplete' }}
				items={this.state.comics}
				renderItem={(item, isHighlighted) =>
						<div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
							{item.label}
						</div>
					}	
	    			shouldItemRender={(item, value) =>
					item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
				}
				onChange={(event, value) => {
					this.setState({ value: event.target.value })
					if (value.length > 3){
						this.requestTimer = getComics(value, (items) => {
							this.setState({ comics: items})
						})
					}
				}}
				onSelect={(value, item) => {
					this.setState({ value: value })
					this.requestTimer = submitSelection(value, item.id, (issueData) => {
						this.setState({latestIssue: issueData})
					})
					console.log(this.state.latestIssue)

				}}
	    			onKeyup={(event, value, item) => {
					event.preventDefault()
					if (event.keyCode === 13){
						submitSelection(value, item.id)
					}
				}}
			/>
	</div>
	    <div>
		<h2>{this.state.latestIssue.title}</h2>
		<p>{this.state.latestIssue.description}</p>
		<img src={this.state.latestIssue.image} alt="cover image" />
		<span>{this.state.latestIssue.price}</span>
	    </div>
      </div>
    );
  }
}


export default App;
