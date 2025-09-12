import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthenticatedRequest } from '../Middleware/authMiddleware';


// ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
export const showAllUsers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        // ค้นหาผู้ใช้ทั้งหมดจากฐานข้อมูล
        const users = await User.find();

        // ส่งข้อมูลผู้ใช้ทั้งหมดกลับไปในรูปแบบ JSON
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve users', error });
    }
};


// ฟังก์ชันสำหรับการลงทะเบียน
export const register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, firstName, lastName, } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }] });
        if (existingUser) {
            if (existingUser.email === email) {
                res.status(400).json({ message: 'อีเมลนี้ มีผู้ใช้อยู่ในระบบแล้ว' });
                return;
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: 'user', // เปลี่ยนจาก 'admin' เป็น 'user' เป็นค่าเริ่มต้น
            profile_img: 'https://res.cloudinary.com/dboau6axv/image/upload/v1735641179/qa9dfyxn8spwm0nwtako.jpg', // กำหนด profile_img
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log('User found:', user);

        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            firstname: user.firstName,
            lastname: user.lastName,
            username: user.username,
            role: user.role,
            profile_img: user.profile_img,
        }, process.env.JWT_SECRET as string, { expiresIn: '20m' });

        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role,
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error });
    }
};
