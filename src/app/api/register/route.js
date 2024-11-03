import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const filePath = path.join(process.cwd(), 'src/data/users.json');
        const fileData = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(fileData);

        const existingUser = users.find((u) => u.username === username);

        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists" }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            password: hashPass
        };

        users.push(newUser);

        await fs.writeFile(filePath, JSON.stringify(users, null, 2));

        return new Response(JSON.stringify({ message: "User created successfully" }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Server error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}