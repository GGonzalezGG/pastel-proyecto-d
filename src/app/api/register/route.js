import dbConnect from '@/app/lib/db';
import User from '@/app/models/users';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        await dbConnect();
        
        const { username, password } = await req.json();

        // Check if user exists
        const userExists = await User.findOne({ username });
        if (username.length < 4){
            return NextResponse.json(
                { message: 'Nombre de usuario muy corto' },
                { status: 400 }
            );
        }
        function esSoloNumeros1(username) {
            return /^\d+$/.test(username);
        }
        if (esSoloNumeros1(username)) {
            return NextResponse.json(
                { message: 'El usuario no puede contener sólo números' },
                { status: 400 }
            );
    }
        if (userExists) {
            return NextResponse.json(
                { message: 'El usuario ya existe' },
                { status: 400 }
            );
        }
        if (password.length < 6) {
            return NextResponse.json(
                { message: 'Contraseña muy corta' },
                { status: 400 }
            );
        }
        function esSoloNumeros(password) {
            return /^\d+$/.test(password);
        }
        if (esSoloNumeros(password)) {
                return NextResponse.json(
                    { message: 'La contraseña no puede contener sólo números' },
                    { status: 400 }
                );
        }
        function esSoloLetras(password){
            return /^[a-zA-Z]+$/.test(password);
        }
        if (esSoloLetras(password)) {
            return NextResponse.json(
                { message: 'La contraseña no puede contener sólo letras' },
                { status: 400 }
            );
        }
        // Create user
        const user = await User.create({
            username,
            password,
        });

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        return NextResponse.json(
            {
                message: 'Usuario creado correctamente',
                username: user.username,
                token
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error de registro:', error);
        return NextResponse.json(
            { message: 'Error en el servidor durante el registro' },
            { status: 500 }
        );
    }
}
