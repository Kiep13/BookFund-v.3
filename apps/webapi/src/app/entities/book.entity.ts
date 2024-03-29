import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AuthorEntity } from '@entities/author.entity';
import { CollectionEntity } from '@entities/collection.entity';
import { CommentEntity } from '@entities/comment.entity';
import { FavoriteEntity } from '@entities/favorite.entity';
import { GenreEntity } from '@entities/genre.entity';

@Entity({
  name: 'book'
})
export class BookEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int8'
  })
  id: number;

  @Column({
    name: 'title',
    type: 'varchar'
  })
  title: string;

  @Column({
    name: 'amountPages',
    type: 'int'
  })
  amountPages: number;

  @Column({
    name: 'year',
    type: 'int'
  })
  year: number;

  @Column({
    name: 'image',
    type: 'varchar',
    nullable: true
  })
  image: string;

  @Column({
    name: 'fileName',
    type: 'varchar'
  })
  fileName: string;

  @Column({
    name: 'fileUrl',
    type: 'varchar'
  })
  fileUrl: string;

  @Column({
    name: 'description',
    type: 'text'
  })
  description: string;

  @Column({
    name: 'avgRate',
    type: 'float',
    default: 0.0,
    nullable: true
  })
  avgRate: number;

  @ManyToOne(() => AuthorEntity, author => author.books, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({
    name: 'authorId'
  })
  author: AuthorEntity;

  @ManyToMany(() => GenreEntity, genre => genre.books)
  @JoinTable({
    name: 'book_genre'
  })
  genres: GenreEntity[];

  @ManyToMany(() => CollectionEntity, collection => collection.books, {
    cascade: true
  })
  collections: CollectionEntity[];

  @OneToMany(() => FavoriteEntity, favorite => favorite.book)
  favorites: FavoriteEntity[];

  @OneToMany(() => CommentEntity, comment => comment.book)
  comments: CommentEntity[];

  @Column({
    select: false,
    nullable: true,
    insert: false,
    update: false
  })
  public isCommented: boolean;

  @Column({
    select: false,
    nullable: true,
    insert: false,
    update: false
  })
  public ratesAmount: number;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    nullable: true,
    insert: true,
    default: new Date()
  })
  createdAt: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    nullable: true,
    update: true,
    default: new Date()
  })
  updatedAt: Date;

  public favorite: FavoriteEntity;
}

