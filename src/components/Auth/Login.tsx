import React, { Component } from "react";
import './Styles.css';
import logo from "./assets/pm-logo.png"

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

interface LoginProps {
    updateToken(token: string): void
}
interface LoginState {
    email : string,
    password : string,
    isAdmin : boolean,
    errors : {
        email : string,
        password : string
    }
    handleOpen: true,
    handleClose: false,
}

class Login extends Component <LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isAdmin: false,
            errors: {
                email: '',
                password: ''
            },
            handleOpen: true,
            handleClose: false

        }
    }

    handleSubmit = async (event : any) => {
        event.preventDefault();
        const apiURL = `http://localhost:3000/user/login`
        const reqBody = {
            email: this.state.email,
            password: this.state.password
        }
        try {
        const res = await fetch(apiURL, {
        // fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.token)
        })
    } catch (e) {
        console.log(e)
    }
}
    render() {
    
        return(
        <div className="bgDiv">
            <Box
            sx={{
                margin: "auto",
                marginTop: "3em",
                padding: "2em",
                width: 300,
                height: "auto",
                bgcolor: '#b8b0a0',
            }}>
                <img src={logo} alt="Phonic Menagerie" className="logoImgLogin"/>
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
            <FormLabel component="legend">Are you an Administrator?</FormLabel>
            <RadioGroup row aria-label="isAdmin" name="row-radio-buttons-group">
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
            </FormControl>
            <div>
            <Button 
            type="submit"
            sx={{
                color: 'white',
                background: '#a1936d',
            }}>Register</Button>
            <Button className="logBtn">Login</Button>
            </div>
            </Box>
            
        </div>
        );
    };
};

export default Login;