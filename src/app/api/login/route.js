import { promises as fs } from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        const filePath = path.join(process.cwd(), 'src/data/users.json');
        const fileData = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(fileData);

        const user = users.find((u) => u.username === username);

        if (user && (await bcrypt.compare(password, user.password))) {
            // Don't send the password back
            const { password: _, ...userData } = user;
            
            return new Response(JSON.stringify({
                message: "Login successful",
                username: userData.username
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ message: "Invalid credentials" }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: "Server error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}