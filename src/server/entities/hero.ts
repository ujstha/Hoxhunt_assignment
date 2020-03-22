import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { ObjectType, ID, Field } from 'type-graphql'
import { Lazy } from '../helpers'
import { Skill } from './skill'
import { TElement } from '../types/element'
import { LifePower } from './lifePower'
import { Attribute } from './attribute'

@Entity()
@ObjectType()
export class Hero {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  imgUrl: string

  @Field()
  @Column()
  description: string

  @Field()
  @Column()
  backStory: string

  @Field(type => [Skill])
  @ManyToMany(type => Skill, { lazy: true, cascade: ['insert'] })
  @JoinTable()
  skills: Lazy<Skill[]>

  @Field(type => Attribute)
  @OneToOne(type => Attribute, { lazy: true, cascade: ['insert'], eager: true })
  @JoinColumn()
  attributes: Lazy<Attribute>

  /* </attributes>*/

  @Field(type => LifePower)
  @OneToOne(type => LifePower, {
    lazy: true,
    cascade: ['insert'],
    eager: true
  })
  @JoinColumn()
  life_powers: Lazy<LifePower>

  /* </Lifepower>*/

  @Field()
  @Column()
  resistance: TElement

  @Field()
  @Column()
  weakness: TElement
}
