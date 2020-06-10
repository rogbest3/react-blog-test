import Post from "../../models/post"
import mongoose from 'mongoose'
import sanitizeHtml from 'sanitize-html'

const {ObjectId} = mongoose.Types;

const sanitizeOption = {
    allowedTags : [
        'h1',
        'h2',
        'b',
        'i',
        'u',
        's',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'a',
        'img',
    ],
    allowedAttributes : {
        a : ['href', 'name', 'target'],
        img : ['src'],
        li : ['class']
    },
    allowedSchema : ['data', 'http']
}

export const getPostById = async (ctx, next) => {
    const {id} = ctx.params
    if(!ObjectId.isValid(id)){
        ctx.status = 400    // Bad Request
        return
    }
    try{
        const post = await Post.findById(id);
        if(!post){
            ctx.status = 404;
            return;
        }
        ctx.state.post = post;
        return next()
    } catch(e){
        ctx.throw(500, e)
    }
}

export const write = async ctx => {
 const { title, body, tags } = ctx.request.body;
 const post = new Post({ 
     title, 
     body : sanitizeHtml(body, sanitizeOption), 
     tags,
     user : ctx.state.user
 })
 try{
    await post.save()
    ctx.body = post;
 } catch(e){
    ctx.throw(500, e)
 }
}

export const list = async ctx => {
    try{
        const { tag, username } = ctx.query;
        // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음
        const query = {
            ...(username ? { 'user.username': username } : {}),
            ...(tag ? { tags: tag } : {}),
        };
        const posts = await Post.find(query).exec()
        ctx.body = posts
        // ctx.body = posts.map(post => ({
        //     ...post,
        //     body : removeHtmlAndShorten(post.body)
        // }))
    } catch(e){
        ctx.throw(500, e)
    }
}

export const read = ctx => {
    ctx.body = ctx.state.post;
}

export const remove = async ctx => {
    const {id} = ctx.params;
    try{
        await Post.findByIdAndRemove(id).exec()
        ctx.status = 204    // No Content
    } catch(e){
        ctx.throw(500, e)
    }
}

export const update = async ctx => {
    const {id} = ctx.params
    const nextData = {...ctx.request.body}
    if(nextData.body){
        nextData.body = sanitizeHtml(nextData.body)
    }
    try{
        const post = await Post.findByIdAndUpdate(id, nextData,{
            new : true  // 이 값을 설정하면 업데이트된데이터를 반환함
                        // false 일 때 는 업데이트되기 전의 데이터를 반환함
        }).exec()
        if(!post){
            ctx.status = 404
            return
        }
        ctx.body = post
    }catch(e){
        ctx.throw(500, e)
    }
}

export const checkOwnPost = (ctx, next) => {
    const {user, post} = ctx.state;
    if(post.user._id.toString() !== user._id){
        ctx.status = 403;
        return;
    }
    return next();
}

const removeHtmlAndShorten = body =>{
    const filtered = sanitizeHtml(body, {
        allowedTags : []
    })
    return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`
}