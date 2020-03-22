import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { ObjectType, ID, Field } from 'type-graphql'
import { Lazy } from '../helpers'
import { Hero } from './hero'

@Entity()
@ObjectType()
export class Attribute {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @OneToOne(type => Hero, { lazy: true })
  heroes: Lazy<Hero[]>

  @Field()
  @Column()
  strength: number

  @Field()
  @Column()
  intelligence: number

  @Field()
  @Column()
  stamina: number

  @Field()
  @Column()
  agility: number

  @Field()
  @Column()
  speed: number
}
