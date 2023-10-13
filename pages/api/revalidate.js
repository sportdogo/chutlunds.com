
export default async function handler(req, res) {
    
    // Check for secret to confirm this is a valid request
 if (req.query.secret !== "sadfsadfdsafdsafasdfsdafdsafsadfdsaf") {
   return res.status(401).json({ message: 'Invalid token' })
 }

   try {
    await res.revalidate('/')
    await res.revalidate('/photo')
    console.log('Re-Validating... Successfull');
    return res.json({ revalidated: true })
   } catch (error) {
       console.log(error);
       return res.status(500).send(error)
   }
}

