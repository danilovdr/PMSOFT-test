import React, { useState, Dispatch, SetStateAction } from 'react';
import PropTypes from 'prop-types'
import { redirect, useNavigate } from 'react-router-dom'
import { Row, Col, Card, CardHeader, CardBody, CardTitle, CardFooter, Input, Button, Alert } from 'reactstrap'

interface LoginModel {
    Name: string,
    Password: string
}

export default function LoginComponent() {
    const [alert, setAlert] = useState({
        showAlert: false,
        textAlert: ''
    });

    const [name, setName] = useState<string>('');
    const [pass, setPass] = useState<string>('');

    async function login(): Promise<void> {
        setAlert({
            showAlert: false,
            textAlert: ''
        });

        if (!name) {
            setAlert({
                showAlert: true,
                textAlert: 'Необходимо ввести логин'
            });
            return;
        }

        if (!pass) {
            setAlert({
                showAlert: true,
                textAlert: 'Необходимо ввести пароль'
            });
            return;
        }

        let body: LoginModel = {
            Name: name,
            Password: pass
        }

        let response = await fetch('/api/Account/login', {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(body)
        });

        if (response.status == 200) {
            redirect('../books');
        } else {
            let message = await response.text();

            setAlert({
                showAlert: true,
                textAlert: message
            });
        }

    }

    function toRegister(): void {
        redirect('../register');
    }

    return (
        <Card className='m-auto mt-5' style={{
            width: '500px'
        }}>
            <CardHeader>
                Авторизация
            </CardHeader>
            <CardBody>
                <Input className='w-100 mt-3 m-auto' type='text' placeholder='Логин' onChange={e => setName(e.target.value)} />
                <Input className='w-100 mt-3 m-auto' type='text' placeholder='Пароль' onChange={e => setPass(e.target.value)} />
            </CardBody>
            <Alert color='danger' className='m-3 mt-0' hidden={!alert.showAlert}>{alert.textAlert}</Alert>
            <CardFooter className='text-center'>
                <Button color='primary' className='mt-1 w-100' onClick={login}>Войти</Button>
                <Button color='light' className='mt-1 w-100' onClick={toRegister}>Регистрация</Button>
            </CardFooter>
        </Card >
    )
}