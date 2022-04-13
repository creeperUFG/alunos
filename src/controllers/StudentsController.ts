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

  async getCourses(request: express.Request, response: express.Response) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter todos os cursos da ufg.'

    const startYear = request.params.year;

    try {
      const courses: typeof Students = await Students.distinct("course");
      return response.json({
        courses,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getAllFromCourse(request: express.Request, response: express.Response) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter todos os alunos de um curso.'

    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const course = request.params.course;

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

  async getNumberOfStudentsFromCurse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter ao numero de alunos do curso.'

    // #swagger.parameters['year'] = { description: 'Ano da busca dos indicadores.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const year = request.params.year;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const graduatedStudents: typeof Students = await Students.find({
        endYear: year,
        course,
        status: "Currículo integralizado",
      });

      const dropoutStudents: typeof Students = await Students.find({
        endYear: year,
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

      const activeStudents: typeof Students = await Students.find({
        course,
        status: "",
      });

      return response.json({
        course,
        year,
        graduatedStudents: graduatedStudents.length,
        dropoutStudents: dropoutStudents.length,
        activeStudents: activeStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getNumberOfQuotaStudentsFromCurse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter indicadores de alunos cotistas de um curso.'

    // #swagger.parameters['year'] = { description: 'Ano da busca dos alunos.' }
    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }

    const year = request.params.year;
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
        endYear: year,
        course,
        status: "Currículo integralizado",
      });

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
        endYear: year,
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

      return response.json({
        course,
        year,
        graduatedQuotaStudents: graduatedStudents.length,
        dropoutQuotaStudents: dropoutQuotaStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getNumberOfActiveStudentsFromCurse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter ao numero de alunos por quotas ativos do curso.'

    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const activeStudents: typeof Students = await Students.find({
        course,
        status: "",
      });

      return response.json({
        course,
        activeStudents: activeStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getNumberOfActiveQuotaStudentsFromCurse(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter ao numero de alunos ativos do curso.'

    // #swagger.parameters['course'] = { description: 'Curso dos aluno.' }
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const activeStudents: typeof Students = await Students.find({
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
        course,
        status: "",
      });

      return response.json({
        course,
        activeStudents: activeStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },

  async getClassIndicators(
    request: express.Request,
    response: express.Response
  ) {
    // #swagger.tags = ['Students']
    // #swagger.description = 'Endpoint para obter ao numero de alunos do curso.'

    // #swagger.parameters['startYear'] = { description: 'Ano de início da turma.' }
    // #swagger.parameters['endYear'] = { description: 'Ano de termino da turma.' }
    // #swagger.parameters['course'] = { description: 'Curso dos alunos.' }

    const startYear = request.params.startYear;
    const endYear = request.params.endYear;
    const course = functions.capitalizeFirstLetter(request.params.course);

    try {
      const graduatedStudents: typeof Students = await Students.find({
        startYear,
        endYear,
        course,
        status: "Currículo integralizado",
      });

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

      const activeStudents: typeof Students = await Students.find({
        startYear,
        course,
        status: "",
      });

      return response.json({
        course,
        endYear,
        startYear,
        graduatedStudents: graduatedStudents.length,
        dropoutStudents: dropoutStudents.length,
        activeStudents: activeStudents.length,
      });
    } catch (err) {
      return response.status(500);
    }
  },
};
