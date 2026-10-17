

export interface BlogData {
    id : number,
    title : string,
    image : string,
    dis : string,
    date : string,
}


export interface BlogDetailPageProps {
    params: Promise<{ slug: string }>
}