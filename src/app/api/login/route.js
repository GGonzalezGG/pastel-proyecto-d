import dbConnect from '@/app/lib/db';
import User from '@/app/models/users';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        await dbConnect();
        
        const { username, password } = await req.json();

        // Find user
        const user = await User.findOne({ username });
        
        if (!user) {
            return NextResponse.json(
                { message: 'Usuario inválido' },
                { status: 401 }
            );
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        
        if (!isMatch) {
            return NextResponse.json(
                { message: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        return NextResponse.json(
            {
                message: 'Inicio de Sesión exitoso',
                username: user.username,
                token
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Error del servidor durante el inicio de sesión' },
            { status: 500 }
        );
    }
}