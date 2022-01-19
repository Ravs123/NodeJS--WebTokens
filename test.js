const empDetails=[{id:1 ,empName:"Rave",jobDes:"UIDeveloper"},
                    {id:2,empName:"Mohan",jobDes:"BackendDeveloper"},
                    {id:3,empName:"karthik",jobDes:"Admin"}]

for(empDetails=0;empDetails>length;empDetails++){
    const filterData=empDetails.filter(id,empName,jobDes)
    console.log(filterData)
}