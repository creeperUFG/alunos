import express from "express";
const functions = require("../functions.ts");
const Students = require("./../models/Students");

module.exports = {
  async add(request: express.Request, response: express.Response) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para adicionar um aluno.'

    // #swagger.parameters['city'] = { description: 'Cidade onde o aluno estuda.' }
    // #swagger.parameters['course'] = { description: 'Curso do aluno.' }
    // #swagger.parameters['courseType'] = { description: 'Tipo do curso do aluno (Graduação, Mestrado, Tecnologico...).' }
    // #swagger.parameters['courseGrau'] = { description: 'Grau do curso (bacharelado, licenciatura...).' }
    // #swagger.parameters['shift'] = { description: 'Turno do curso do aluno (Integral, Matutino, Noturno...).' }
    // #swagger.parameters['startYear'] = { description: 'Ano de ingresso do aluno.' }
    // #swagger.parameters['endYear'] = { description: 'Ano de saída do aluno.' }
    // #swagger.parameters['typeOfEntry'] = { description: 'Tipo de entrada no curso (ac, ri-ppi, ri...).' }
    // #swagger.parameters['globalScore'] = { description: 'Média global do aluno.' }
    // #swagger.parameters['courseGlobalScore'] = { description: 'Média global do curso do aluno.' }
    // #swagger.parameters['status'] = { description: 'Status do aluno (cursando, formado, desistente, excluído...).' }
    const {
      city,
      course,
      courseType,
      courseGrau,
      shift, //Turno
      startYear,
      endYear,
      typeOfEntry,
      globalScore,
      courseGlobalScore,
      status,
    } = request.body;

    try {
      const student = await Students.create({
        city,
        course,
        courseType,
        courseGrau,
        shift, //Turno
        startYear,
        endYear,
        typeOfEntry,
        globalScore,
        courseGlobalScore,
        status,
      });

      /* #swagger.responses[200] = { 
              schema: { $ref: "#/definitions/Student" },
              description: 'Aluno cadastrado.' 
      } */

      return response.json(student);
    } catch (err) {
      return response.status(500).json("Internal server error");
    }
  },

  async getAllFromYear(request: express.Request, response: express.Response) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter todos os alunos de um determinado ano.'

    // #swagger.parameters['year'] = { description: 'Ano de entrada dos alunos.' }

    const startYear = request.params.year;

    try {
      const students: typeof Students = await Students.find({
        startYear,
      });

      return response.json({
        students,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getAllFromCourse(request: express.Request, response: express.Response) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter todos os alunos de um curso.'

    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const course = request.params.year;

    try {
      const students: typeof Students = await Students.find({
        course,
      });

      return response.json({
        students,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getAllFromYearAndCourse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter todos os alunos de um ano e curso.'

    // #swagger.parameters['year'] = { description: 'Ano de entrada dos alunos.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const startYear = request.params.year;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const students: typeof Students = await Students.find({
        startYear,
        course,
      });

      return response.json({
        students,
      });
    } catch (err) {
      return response.status(500);
    }
  },
};
