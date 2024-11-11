import { ContentType } from "@prisma/client"
import { Type } from "class-transformer";
import { IsNumber, IsString, MinLength } from "class-validator";

export class updateContentDto {
    @IsString()
    @MinLength(1)
    title: string
    type: ContentType
    @Type(()=>Number)
    @IsNumber()
    duration: number
    @Type(()=>Number)
    @IsNumber()
    releaseDate: number;
    @IsString()
    @MinLength(2)
    url: string
    @Type(()=>Number)
    @IsNumber()
    @MinLength(4)
    ageLimit: number
    @IsString()
    @MinLength(1)
    originalTitle: string
}