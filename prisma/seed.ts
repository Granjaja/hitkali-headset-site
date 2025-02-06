import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';


async function main(){
    const password = process.env.ADMIN_PASSWORD || 'defaultPassword';
    const admin = 'granvilekaranja@gmail.com'
    const hashedAdminPassword = await bcrypt.hash(password, 10)

    await prisma.user.upsert({
        where: {email: admin},
        update: {role: 'ADMIN'},
        create: {
            email: admin,
            password: hashedAdminPassword,
            role: 'ADMIN',
            name: 'Admin Gran'
        }
    })
}

main()
.catch((error) => {console.error(error)})
.finally(async () => {await prisma.$disconnect()})  