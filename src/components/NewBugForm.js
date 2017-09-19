import React, { Component } from 'react';

class NewBugForm extends Component {
    constructor (props){
        super (props);

        this.sendHandleFormSubmit = this.sendHandleFormSubmit.bind(this);
    }
    
    sendHandleFormSubmit (e){
        e.preventDefault();

        let newIssue = this.issue.value;        

        this.props.handleFormSubmit(newIssue);

        document.getElementById('issue').value = '';
    }

    render (){
        const { appSelected, handleChange, handleFormSubmit, apps } = this.props;

        let appsSelectDisplay = apps.map(app => {
            return <option 
                      key={app.id}
                      value={app.id}
                    >
                      {app.name}
                  </option>;
          });

        return (
            <div>
                <form>
                    <h4 className="text-muted">Submit new bug ticket&nbsp;&nbsp;<i className="glyphicon glyphicon-tag"></i></h4>              
                    <hr />
                    <div className="row">
                        <div className="col-md-offset-2">
                            <select 
                                className="form-control"                        
                                onChange={handleChange}
                            >
                                <option value='-1'>Select an App</option>
                                {appsSelectDisplay}
                            </select>  
                            <br />
                            <textarea
                                id="issue"
                                className="form-control"
                                placeholder="Issue..."
                                ref={text => this.issue = text}
                                disabled={!appSelected}
                                style={styles.textArea}
                                width="200"
                                rows="5"
                            />
                            <br />
                            <button
                                className="btn btn-primary"
                                style={styles.button}
                                disabled={!appSelected}
                                onClick={this.sendHandleFormSubmit}
                            >
                                Submit
                            </button>
                        </div>          
                    </div>               
                </form>            
            </div>
        );
    }
}

const styles = {
    textArea: {
        resize: 'none'
    },
    button: {
        backgroundColor: '#333',
        color: 'white'
      }
};

export default NewBugForm;