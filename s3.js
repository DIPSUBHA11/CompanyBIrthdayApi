import aws from 'aws-sdk'
import dotenv from "dotenv"
import crypto from 'crypto' 
import { promisify } from 'util'

const randomBytes = promisify(crypto.randomBytes)
dotenv.config()
const region="us-east-2"
const bucketName="employeenamecontainimage"
const accessKeyId=process.env.AWS_ACCESS_KEY_ID
const serectAccessKey=process.env.AWS_SECRET_ACCESS_KEY

const s3=new aws.S3({
    region,
    accessKeyId,
    serectAccessKey,
    signatureVersion:'v4',
     AWS_SDK_LOAD_CONFIG:1
})

export async function generateUrl(){
    try{    
   const rawBytes= await randomBytes(16)
    const ImageName=rawBytes.toString('hex')
  const params=({
      Bucket:bucketName,
      Key:ImageName,
      Expires:60
  })

  const uploadURL=await s3.getSignedUrlPromise('putObject',params)
  return uploadURL}
  catch(e){console.log(e)}
}