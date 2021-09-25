import React, { Component } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

interface SignupProps {
    token?: string,
    updateToken(token: string): void
}

interface SignupState {
    email: string,
    password: string
    errors: {
        email: string,
        password: string
    }
    updateToken: string
}

class Signup extends Component <SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: '',
            },
            updateToken: ''
        }
    }

    handleSubmit = async (e : any) => {
        e.preventDefault();
        const apiURL = `http://localhost:3000/user/login`
        const reqBody = {
            email: this.state.email,
            password: this.state.password
        }
        try {
        const res = await fetch(apiURL, {
        // fetch(`${APIURL}/user/create`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({updateToken: (data.token)})
            console.log(data.token)
            console.log(data)
        })
    } catch (e) {
        console.log(e)
    }
}

    render() {
    return (
        <div>

        <FormControl onSubmit={this.handleSubmit}>
            <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({email: (e.target.value)})}}
                id="standard-password-input"
                label="Email"
                type="username"
                autoComplete="current-email"
                variant="standard"
                required
            />
            <br/>
            <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({password: (e.target.value)})}}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                required
            />
            <br/>
            {/* <FormLabel component="legend">Are you an Administrator?</FormLabel>
            <FormGroup check>
            <Label check>
                <Input type="checkbox" id="checkbox2" checked={this.state.isAdmin} onChange={this.handleChange}/>{' '}
                Are you an admin?
            </Label>
            </FormGroup> */}
            <div>
            <Button 
            type="submit"
            sx={{
                color: 'white',
                background: '#a1936d',
            }}>Register</Button>
            <Button type="submit" className="logBtn">Login</Button>
            </div>
            </FormControl>

        </div>
    );
};
}

export default Signup;