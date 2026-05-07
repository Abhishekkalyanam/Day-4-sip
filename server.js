const express = require('express')
const app = express()
const investorRoutes = require('./routes/investorRoutes')
const db = require('./utility/dbManager')
const fundRoutes = require("./routes/fundRoutes");
const sipRoutes = require("./routes/sipRoutes");

app.use(express.json())
app.use('/api/investor', investorRoutes)
app.use("/api/funds", fundRoutes);
app.use("/api/sips", sipRoutes);

app.listen(3000, ()=>{
    console.log('Server Started')
})