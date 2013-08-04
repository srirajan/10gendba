db.zips.aggregate({$group:{_id:{state:"$state"},sumzip:{$sum:1}}},{$sort:{sumzip:1}})
