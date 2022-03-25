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

  async getAllgraduatedFromStartYearAndCourse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter todos os alunos formados de um ano de início e curso.'

    // #swagger.parameters['year'] = { description: 'Ano de entrada dos alunos.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const startYear = request.params.year;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const students: typeof Students = await Students.find({
        startYear,
        course,
        status: "Currículo integralizado",
      });

      return response.json({
        students,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getAllgraduatedFromEndYearAndCourse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter todos os alunos formados de um ano de início e curso.'

    // #swagger.parameters['year'] = { description: 'Ano de entrada dos alunos.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const endYear = request.params.year;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const students: typeof Students = await Students.find({
        endYear,
        course,
        status: "Currículo integralizado",
      });

      return response.json({
        students,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getPercentOfStudentsgraduatedFromCurse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter a porcentagem de alunos formados de um curso.'

    // #swagger.parameters['year'] = { description: 'Ano de entrada dos alunos.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const startYear = request.params.year;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const graduatedStudents: typeof Students = await Students.find({
        startYear,
        course,
        status: "Currículo integralizado",
      });

      const totalStudents: typeof Students = await Students.find({
        startYear,
        course,
      });

      return response.json({
        course,
        startYear,
        graduatedStudents: graduatedStudents.length,
        [`totalStudents${startYear}`]: totalStudents.length,
        percentOfGraduatedStudents:
          graduatedStudents.length / totalStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getPercentOfDropoutStudentsFromCurse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter a porcentagem de alunos desistentes de um curso.'

    // #swagger.parameters['year'] = { description: 'Ano de entrada dos alunos.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const startYear = request.params.year;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const dropoutStudents: typeof Students = await Students.find({
        startYear,
        course,
        status: {
          $in: [
            "RF e/ou RM 3 vezes na mesma disciplina",
            "RF 3 vezes na mesma disciplina",
            "RF e/ou RM em todas as disciplinas no semestre de ingresso",
            "Não renovou o vínculo com a UFG",
            "Opção por outro curso da UFG",
            "Desistência do curso",
            "Esgotamento de prazo para conclusão de curso",
            "RF e/ou RM em todas disciplinas por 2 semestres consecutivos",
            "RF e/ou RMF em todas as disciplinas no semestre de ingresso",
            "RF em todas as disciplinas por 2 semestres consecutivos",
            "Transfência para outra IES",
            "Matrícula Declarada Nula Por Decisão Judicial",
            "Matrícula Declarada Nula Por Decisão Administrativa",
          ],
        },
      });

      const totalStudents: typeof Students = await Students.find({
        startYear,
        course,
      });

      return response.json({
        course,
        startYear,
        dropoutStudents: dropoutStudents.length,
        [`totalStudents${startYear}`]: totalStudents.length,
        percentOfDropoutStudents: dropoutStudents.length / totalStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getPercentOfStudentsgraduatedQuotasFromCurse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter a porcentagem de alunos cotistas formados de um curso.'

    // #swagger.parameters['year'] = { description: 'Ano de entrada dos alunos.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const startYear = request.params.year;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const graduatedStudents: typeof Students = await Students.find({
        typeOfEntry: {
          $in: [
            "escola pública",
            "negro escola pública",
            "l2 - ppi renda inferior",
            "l4 - ppi renda superior",
            "l3 - dc renda superior",
            "l1 - dc renda inferior",
            "rs-ppi",
            "ri",
            "rs",
            "ri-ppi",
            "rs-ppi-cd",
            "ri-ppi-cd",
            "rs-cd",
            "ri-cd",
          ],
        },
        startYear,
        course,
        status: "Currículo integralizado",
      });

      const totalStudents: typeof Students = await Students.find({
        typeOfEntry: {
          $in: [
            "escola pública",
            "negro escola pública",
            "l2 - ppi renda inferior",
            "l4 - ppi renda superior",
            "l3 - dc renda superior",
            "l1 - dc renda inferior",
            "rs-ppi",
            "ri",
            "rs",
            "ri-ppi",
            "rs-ppi-cd",
            "ri-ppi-cd",
            "rs-cd",
            "ri-cd",
          ],
        },
        startYear,
        course,
      });

      return response.json({
        course,
        startYear,
        graduatedQuotaStudents: graduatedStudents.length,
        [`totalQuotaStudents${startYear}`]: totalStudents.length,
        percentOfQuotaGraduatedStudents:
          graduatedStudents.length / totalStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getPercentOfDropoutStudentsQuotasFromCurse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter a porcentagem de alunos desistentes cotistas de um curso.'

    // #swagger.parameters['year'] = { description: 'Ano de entrada dos alunos.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const startYear = request.params.year;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const dropoutQuotaStudents: typeof Students = await Students.find({
        typeOfEntry: {
          $in: [
            "escola pública",
            "negro escola pública",
            "l2 - ppi renda inferior",
            "l4 - ppi renda superior",
            "l3 - dc renda superior",
            "l1 - dc renda inferior",
            "rs-ppi",
            "ri",
            "rs",
            "ri-ppi",
            "rs-ppi-cd",
            "ri-ppi-cd",
            "rs-cd",
            "ri-cd",
          ],
        },
        startYear,
        course,
        status: {
          $in: [
            "RF e/ou RM 3 vezes na mesma disciplina",
            "RF 3 vezes na mesma disciplina",
            "RF e/ou RM em todas as disciplinas no semestre de ingresso",
            "Não renovou o vínculo com a UFG",
            "Opção por outro curso da UFG",
            "Desistência do curso",
            "Esgotamento de prazo para conclusão de curso",
            "RF e/ou RM em todas disciplinas por 2 semestres consecutivos",
            "RF e/ou RMF em todas as disciplinas no semestre de ingresso",
            "RF em todas as disciplinas por 2 semestres consecutivos",
            "Transfência para outra IES",
            "Matrícula Declarada Nula Por Decisão Judicial",
            "Matrícula Declarada Nula Por Decisão Administrativa",
          ],
        },
      });

      const totalQuotaStudents: typeof Students = await Students.find({
        typeOfEntry: {
          $in: [
            "escola pública",
            "negro escola pública",
            "l2 - ppi renda inferior",
            "l4 - ppi renda superior",
            "l3 - dc renda superior",
            "l1 - dc renda inferior",
            "rs-ppi",
            "ri",
            "rs",
            "ri-ppi",
            "rs-ppi-cd",
            "ri-ppi-cd",
            "rs-cd",
            "ri-cd",
          ],
        },
        startYear,
        course,
      });

      return response.json({
        course,
        startYear,
        dropoutQuotaStudents: dropoutQuotaStudents.length,
        [`totalQuotaStudents${startYear}`]: totalQuotaStudents.length,
        percentOfQuotaDropoutStudents:
          dropoutQuotaStudents.length / totalQuotaStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },
};
