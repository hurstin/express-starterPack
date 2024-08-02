// use this instead of the try/catch block to make our code look more simplified
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
// THE TRY/CATCH BLOCK FOR ASYNC FUNCTIONS
// try {

//  } catch (err) {
//     res.status(404).json({
//         status: 'fail',
//         message:err
//     })
// }
