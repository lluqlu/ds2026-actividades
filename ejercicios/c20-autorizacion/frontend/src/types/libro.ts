// AI-C19: los tipos del front ahora reflejan el JSON real de la API
// (Prisma), no el mock. El autor viaja como objeto anidado por la relación;
// para el alta se manda autorId. `categorias` sólo llega en el detalle
// (GET /api/libros/:id).

export type Autor = {
  id: number
  nombre: string
  nacionalidad: string
}

export type Categoria = {
  id: number
  nombre: string
}

export type Libro = {
  id: number
  titulo: string
  autorId: number
  autor: Autor
  precio: number
  imagen: string
  disponible: boolean
  categorias?: Categoria[]
}
