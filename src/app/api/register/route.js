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
        
        if (userExists) {
            return NextResponse.json(
                { message: 'User already exists' },
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
                message: 'User created successfully',
                username: user.username,
                token
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Server error during registration' },
            { status: 500 }
        );
    }
}
