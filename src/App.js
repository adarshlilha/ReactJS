import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {db,auth,googleAuthProvider} from './firebase'
import firebase from 'firebase';

class App extends Component {
  state = {
    name : null,
    students : [],
    user : null
  };
  componentDidMount(){
    db.doc('bootcamps/bangalore')
    .get()
    .then(doc => this.setState({name: doc.data().name}))

    db.collection('students')
    .onSnapshot(coll => {
        const students = coll.docs.map(doc => doc.data())
        this.setState({students}) 
    });

    auth.onAuthStateChanged(user => this.setState({user}))
  }

  handleEvent = event => {
    event.preventDefault()
    // console.log(this.titleName.value);
    // db.doc('bootcamps/bangalore').set({name : this.titleName.value})
    // db.collection('students').add({name : this.titleName.value})

    const newStudent = db.collection('students').doc()
    newStudent.set({
      name : this.titleName.value,
      id:newStudent.id,
      createdBy:this.state.user.uid
    })
    this.titleName.value = null;
    console.log('write done');
  }

  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <h1>{this.state && this.state.name}</h1>
        <p className="app-intro">{this.state && this.state.name}</p>
        p.lala
        <ul>
          {this.state.students && this.state.students.map(
            (student,index) => (
              <li key={index}>
                {this.state.user && student.votes && Object.keys(student.votes).length}

                {this.state.user && student.votes && Object.keys(student.votes).includes(this.state.user.uid)?
                <button onClick={() => {
                    db.collection('students').doc(`${student.id}`).set({votes : {[this.state.user.uid] : firebase.firestore.FieldValue.delete()}}, {merge : true})
                  }
                }>-1</button>:<button onClick={() => {
                    db.collection('students').doc(`${student.id}`).set({votes : {[this.state.user.uid] : true}}, {merge : true})
                  }
                }>+1</button>}

                {student.name}
                {this.state.user && this.state.user.uid === student.createdBy && <button onClick={() => 
                  db.collection('students').doc(`${student.id}`).delete()                                                                   
                }>
                X                                                           
                </button>}
              </li>
             ))}
        </ul>

        {this.state.user && 
        <form onSubmit={e => this.handleEvent(e)}>
          <input type="text" ref={input => this.titleName = input}/>
          <button>Suggest</button>
        </form>
        }
        {(!this.state.user) ? <button onClick={() => auth.signInWithPopup(googleAuthProvider)}>Sign In</button>:
        <button onClick={() => auth.signOut()}>Sign Out</button>}
      </div>
    );
  }
}

export default App;