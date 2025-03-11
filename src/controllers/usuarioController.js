import { papelUsuario } from "../models/PapelUsuario.js";
import { usuario, usuarioSchema } from "../models/Usuario.js"; 

class UsuarioController {

    static async listarUsuarios (req, res) {
        try {
            const listaUsuarios = await usuario.find({});
            res.status(200).json(listaUsuarios);            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição.` });
        }
    };

    // static async criarUsuario (req, res) {
    //     try {
    //         const novoUsuario = await usuario.create(req.body);
    //         res.status(201).json({ message: "Usuário criado!", usuario: novoUsuario });
    //     } catch (erro) {
    //         res.status(500).json({ message: `${erro.message} - Falha ao criar usuário.` });
    //     }
    // }

    static async criarUsuario (req, res) {
        const novoUsuario = req.body;
        try {
            const papelEncontrado = await papelUsuario.findById(novoUsuario.role);
            const usuarioCompleto = { ...novoUsuario, role: { ...papelEncontrado._doc }};
            const usuarioCriado = await usuario.create(usuarioCompleto);
            res.status(201).json({ message: "Usuário criado!", usuario: usuarioCriado });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao criar usuário.` });
        }
    }
    
    static async editarUsuario (req, res) {
        try {
            const id = req.params.id;
            await usuario.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Usuário atualizado!"});            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao editar usuário.` });
        }
    };

    static async excluirUsuario (req, res) {
        try {
            const id = req.params.id;
            await usuario.findByIdAndDelete(id);
            res.status(200).json({ message: "Usuário excluído!"});            
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao excluir usuário.` });
        }
    };
};

export default UsuarioController;
