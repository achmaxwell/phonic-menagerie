import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface collectionEditProps {
    token: string
    fetchCollection: () => void
    updateOff(): void
    collectionUpdate: any
    // collection: any
    // collection: {
    //     artist: string,
    //     album: string,
    //     format: string,
    //     cat: string
    // }
} 

interface collectionEditState {
    // collection: {
        artist: string,
        album: string,
        format: string,
        cat: string
    // }
    
  }

class CollectionEdit extends Component <collectionEditProps,collectionEditState> {
    constructor(props: collectionEditProps){
        super(props)
        this.state = {
            // collection: {
            artist: '',
            album: '',
            format: '',
            cat: '',
            // }
        }
    }

    collectionUpdate = (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:3000/notes/update/${this.props.collectionUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({collection: {artist: '', album: '', format: '', cat: ''}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then((res) => {
            this.props.fetchCollection();
            this.props.updateOff();
        })
    }

    render(){
    return(
        <div>
            <Form onSubmit={this.collectionUpdate}>
                <FormGroup>
                    <Label htmlFor="collection" className="noteHeaderText">edit your collection</Label>
                    <Input name="yourCollection" value={this.state.artist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({artist: (e.target.value)})}} placeholder="edit artist name" className="formInputName"/>
                </FormGroup>
                <FormGroup>
                    
                </FormGroup>
                <br/>
                <Button type="submit" className="editBtn">update</Button>
            </Form>
            <br/>
        </div>
    )
}
}

export default CollectionEdit;