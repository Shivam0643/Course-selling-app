import  dotenv  from "dotenv"
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD
const STRIPE_SECRET_KEY = "sk_test_51QhPNPEO7VMO51BdRucOpJzFnpecJOwNokn4DbbEvHGRp6ZcMBxrgmDjWRPbuLNFB6x6EnHleqCqyZl4uGlgxVvz00le6NmltJ"

export default{
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    STRIPE_SECRET_KEY,
}