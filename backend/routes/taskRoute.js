import express from "express";
import Task from "../models/Task.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();


// =========================
// Add Task API (POST)
// =========================
router.post("/", async (req, res) => {

    try {

        const { title, description } = req.body;

        const newTask = await Task.create({
            title,
            description
        });

        res.status(201).json({
            message: "Task Added Successfully",
            task: newTask
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// Get All Tasks API (GET)
// =========================
router.get("/", async (req, res) => {

    try {

        const tasks = await Task.find();

        res.status(200).json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// Delete Multiple Tasks API
// IMPORTANT: :id se pehle
// =========================
router.delete("/delete-many", async (req, res) => {

    try {

        const { ids } = req.body;

        await Task.deleteMany({
            _id: { $in: ids }
        });

        res.json({
            message: "Selected Tasks Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// Get Single Task API
// =========================
router.get("/:id", async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Task Not Found"
            });

        }

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =========================
// Update Task API
// =========================
router.put("/:id", async (req, res) => {

    try {

        const { title, description } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(

            req.params.id,

            {
                title,
                description
            },

            {
                new: true
            }

        );

        if (!updatedTask) {

            return res.status(404).json({
                message: "Task Not Found"
            });

        }

        res.json({

            message: "Task Updated Successfully",

            task: updatedTask

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});


// =========================
// Delete Single Task API
// =========================
router.delete("/:id", async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Task Not Found"
            });

        }

        res.json({
            message: "Task Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


export default router;