import User from "@/models/User";
import connectMongo from "@/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    
    // Conecta ao MongoDB
    await connectMongo();

    try {
        // Criação do usuário no banco de dados
        const user = await User.create(data);
        
        // Resposta de sucesso
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        // Retorna uma resposta de erro com status 400
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
