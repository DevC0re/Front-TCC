
describe('login', ()=>{

    it('createAccount', ()=>{
        // CT01  Partição de equivalência 
        // Cadastro com e-mail válido e ainda não cadastrado 
        // Cadastro realizado com sucesso 
        // A preencher 

        cy.visit('http://localhost:5173/signup')
        cy.get('#name').type('Leticio')
        cy.get('#email').type('Leticiodasilva@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('#confirm-password').type('12345678')
        cy.contains('button','Criar nova conta').click()
    })

    it('createAccountExisting', ()=>{

        // CT02 Partição de equivalência 
        // Cadastro com e-mail já utilizado 
        // Sistema informa que o e-mail já está cadastrado 
        // A preencher 
        cy.visit('http://localhost:5173/signup')
        cy.get('#name').type('Leticio')
        cy.get('#email').type('Leticiodasilva@gmail.com')
        cy.get('#password').type('12345678')
        cy.get('#confirm-password').type('12345678')
        cy.contains('button','Criar nova conta').click()
    })

        
        
        it('login',()=>{

            
        })
        // CT03 Partição de equivalência Login com e-mail e senha corretos 
        
        // Usuário autenticado 
        // A preencher 
        
        
        // CT04 Partição de equivalência 
        
        // Login com senha incorreta 
        // Acesso negado e mensagem de erro adequada 
        // A preencher 
        
        
        // CT05 Partição de equivalência 
        
        
        // Envio de cadastro com campos obrigatórios vazios 
        // Cadastro não é concluído e os campos são validados 
        // A preencher 
        
    })