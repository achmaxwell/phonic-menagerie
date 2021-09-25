import { Component } from "react";
import { Row, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

import CollectionEdit from './CollectionEdit';
import CollectionTable from './CollectionTable';
import CollectionAdd from './CollectionAdd';

interface collectionProps {
    token: string
    clickLogout(): void
  } 

interface collectionState {
    // collection: {
    //     artist: string,
    //     album: string,
    //     format: string,
    //     cat: string
    // },
    collection: any
    updateActive: boolean,
    collectionToUpdate: { 
        // collection: {
        artist: string,
        album: string,
        format: string,
        cat: string
    // }
},
  } 

class Collection extends Component <collectionProps, collectionState> {
    constructor(props: collectionProps) {
    super(props)
    this.state = {
        // collection: {
        //     artist: '',
        //     album: '',
        //     format: '',
        //     cat: ''
        // },
        collection: [],
        updateActive: false,
        collectionToUpdate: {
            // collection: {
                artist: '',
                album: '',
                format: '',
                cat: ''
            // }
        },
    }
}

    fetchCollection = () => {
        fetch('http://localhost:3000/collection/myItems', {
            // fetch(`${APIURL}/collection/myItems`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((collectionData) => {
                console.log(collectionData)
                this.setState({collection:(collectionData)})
            })
    }

    editUpdateCollection = (collection: any) => {
        this.setState({collectionToUpdate:(collection)});
        console.log("itemToUpdate " + this.state.collection);
    }

    updateOn = () => {
        this.setState({updateActive: true});
    }

    updateOff = () => {
        this.setState({updateActive: false});
    }

    componentDidMount = () => {
        this.fetchCollection();
    }

    render() {
    return (
        <div>
            <div className="bgDiv">
                <div className="notesViewDiv">
                    <div className="noteDivBtn">
                        <Row>
                            <h3>welcome!</h3>
                            <p>keep track of all your gardening and plant progress by adding a note! If you find additional information edit your note, and if you no longer need the information (way to go gardening master!) simply delete it.</p>
                            <Button id="logoutBtn" size="sm" onClick={this.props.clickLogout} className="logoutBtn">logout</Button>
                            {/* <Button onClick={this.state.toggle} className="addNoteBtn">add note</Button> */}
                            {/* <Modal isOpen={modal} toggle={toggle} className={className}>
                                <ModalHeader className="modalHeader">
                                    <Button onClick={toggle} className="modalCloseBtn">X</Button>
                                </ModalHeader>
                                <ModalBody>
                                    <CollectionAdd fetchCollection={this.fetchCollection} token={this.props.token} toggle={toggle} />
                                </ModalBody>
                            </Modal> */}
                        </Row>
                    </div>
                    <CollectionTable collection={this.state.collection} editUpdateCollection={this.editUpdateCollection}  updateOn={this.updateOn} fetchCollection={this.fetchCollection} token={this.props.token} />

                    {this.state.updateActive ?
                        <CollectionEdit collectionUpdate={this.state.collectionToUpdate} updateOff={this.updateOff} token={this.props.token} fetchCollection={this.fetchCollection} /> : <> </>}

</div>
</div>
        </div>
    )
    }
}


export default Collection;