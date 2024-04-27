const express = require('express');
require("../db/connection");
require('dotenv').config();

const Session = require("../models/Session")

const nodemailer= require('nodemailer');
const User = require("../models/User");
const router = express.Router()
const isStudent = require("../middlewares/checkAuth")
const isteacher = require('../middlewares/checkTeacher')
const sendMail= async(student,teacher,date,details)=>{
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
      },
    });
   
    let studentMailOptions = {
      from: 'soumyadipgantait2003@gmail.com', // Sender's email address
      to: student.email, // Receiver's email address
      subject: 'Session Booked Successfully', // Subject line
      text: `Your session with ${teacher.name}  has been booked on ${date} successfully.Details:${details} ` // Plain text body
  };

  // Define email options for teacher
  let teacherMailOptions = {
      from: 'soumyadipgantait2003@gmail.com', // Sender's email address
      to: teacher.email, // Receiver's email address
      subject: 'New Session Booking', // Subject line
      text: `A new session has been booked by ${student.name} on ${date} .Details: ${details} ` // Plain text body
  };
  
    transporter.sendMail(studentMailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
    transporter.sendMail(teacherMailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  } catch (error) {
      console.log(error);
      res.status(400).json({success:false,message:error});
  }
  
}

const sendStatusMail= async(sessionUser,sessionTeacher,status)=>{
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
      },
    });
   
    let studentMailOptions = {
      from: 'soumyadipgantait2003@gmail.com', // Sender's email address
      to: sessionUser.user.email, // Receiver's email address
      subject: `Session ${status} Successfully`, // Subject line
      text: `Your session with ${sessionTeacher.teacher.name}  has been ${status} on ${sessionUser.date}` // Plain text body
  };

  // Define email options for teacher
  
  
    transporter.sendMail(studentMailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
   
  } catch (error) {
      console.log(error);
      res.status(400).json({success:false,message:error});
  }
  
}

router.post("/book-session",isStudent,async(req,res)=>{
    try{
        const { date, teacherId, details } = req.body;
        const teacher = await User.findById(teacherId);
        const student = await User.findById(req.user._id);
        console.log(teacher);
        console.log(student);
    if (!teacher || teacher.isTeacher === false) {
      res.status(400).json({message:"Teacher is not found"});
    }

    const session = new Session({
      user: req.user._id,
      teacher: teacherId,
      date: new Date(date),
      details
    });
    await session.save();
    await sendMail(student,teacher,date,details);
    res.status(201).send({ message: 'Session booked successfully.' });
    }catch(err){
        console.log(err);
        res.status(400).send({ error: err.message });
    }
})


router.get('/sessions', isStudent, async (req, res) => {
    try {
      const userId = req.user._id;
      const sessionsData = await Session.find({ user: userId }).populate('teacher', 'name email');
     const sessions = sessionsData.filter(session => session.teacher !== null);
      sessions.sort((a, b) => {
        const statusOrder = { Accepted: 0, Pending: 1, Rejected: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
    });
      res.status(200).json({data:sessions});
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  router.get('/sessions/requests', isteacher, async (req, res) => {
    try {
      const userId = req.user._id;
      const sessionsData = await Session.find({ teacher: userId,status: 'Pending'}).populate('user', 'name email');
      const sessions = sessionsData.filter(session => session.user !== null);
      res.status(200).send(sessions);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  router.get('/sessions/acceptedrequests', isteacher, async (req, res) => {
    try {
      const userId = req.user._id;
      const sessions = await Session.find({ teacher: userId,status: 'Accepted'}).populate('user', 'name email');
      res.status(200).send(sessions);
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  router.put('/sessions/:sessionId/update-status', isteacher, async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { status } = req.body;
      console.log(status);
      const userId = req.user._id;
      
      // Check if the session belongs to the logged-in teacher
      const session = await Session.findOne({ _id: sessionId, teacher: userId });
      const sessionUser = await Session.findOne({ _id: sessionId }).populate('user');
      const sessionTeacher = await Session.findOne({ _id: sessionId }).populate('teacher');
      if (!session) {
        return res.status(404).send({ error: 'Session not found or unauthorized.' });
      }
      console.log(sessionUser)
      session.status = status;
    await session.save();
     await sendStatusMail(sessionUser,sessionTeacher,status);
    res.status(200).send({ message: 'Session status updated successfully.' });
  
      //res.status(200).send({ message: 'Session status updated successfully.' });
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  router.get("/getallteachers",isStudent,async (req,res)=>{
    try{
      const teachers = await User.find({ isTeacher: true });

    // Extract name and _id fields from the teachers
    const teachersInfo = teachers.map(teacher => ({
      id: teacher._id,
      name: teacher.name
    }));

    // Return the extracted teacher information as a response
    res.json(teachersInfo);
    }catch(err){
      console.log(err)
      res.status(500).send({ error: 'Internal server error' });
    }
  })
module.exports=router;