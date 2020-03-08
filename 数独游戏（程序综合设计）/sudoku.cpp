#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>
#include <time.h>
#include <windows.h>

#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define POSITIVE 1
#define NEGATIVE 0

typedef int status;
typedef int ElemType;
int bool_num,clause_num;
int copy_num=0;

typedef struct literal{
    ElemType data;
    struct literal *next;

}literal;


typedef struct clause{
    struct clause *next;
    int num;//ָʾ�����Ӿ�����������Ϊ1��˵���ǵ��Ӿ䣬ͷ����numָʾ�Ӿ�ĸ���
    struct literal *HeadNode;

}clause,*Root;

typedef struct same_literal{
    ElemType data;
    int num;
}same_literal;


    int result[500];
    int top=0;
    same_literal *sl;





  /*  same_literal **sl_p;
    same_literal **sl_n;*/
    clause **copy_formula;

int absoluteValue(ElemType e){
    if(e>=0) return e;
    else return (-e);
}

status OpenFile(Root &L){
    L=(Root)malloc(sizeof(clause));
    L->num=0;
    L->next=NULL;
    L->HeadNode=NULL;

    FILE *fp;
    int t;//���ζ����ÿ������
    Root p=L;
    Root tp;
    literal *tq,*q;
    char filename[100];
    printf("�������ļ�����\n");
    scanf("%s",filename);
    fp=fopen(filename,"r+");
    if(!fp){
        printf("���ļ�ʧ�ܣ�\n");
        getchar();
        return ERROR;
    }

    char ts[300];
    char c;
   /* char *sp=s[0];*/
    int i,j;
    i=j=0;
    while((c=fgetc(fp))!='p')
        fgets(ts,80,fp);//��ȡһ���ַ�����һ���ַ�������

    char us[10];

        fscanf(fp,"%s",us);
        fscanf(fp,"%d",&bool_num);
        fscanf(fp,"%d",&clause_num);


   /* sl_p=(same_literal**)malloc((bool_num+1)*(sizeof(same_literal*)));//һ���Է���ռ�
    sl_n=(same_literal**)malloc((bool_num+1)*(sizeof(same_literal*)));
    for(i=0;i<=bool_num;i++){
        sl_p[i]=(same_literal*)malloc(sizeof(same_literal));
        sl_n[i]=(same_literal*)malloc(sizeof(same_literal));
    }*/
    p->num=clause_num;
    sl=(same_literal*)malloc((bool_num+1)*(sizeof(same_literal)));



    i=0;
    j=1;
    p->next=(Root)malloc(sizeof(clause));
    p=p->next;
    q=(literal*)malloc(sizeof(literal));
    p->HeadNode=q;

    printf("��Ԫ����%d\n�Ӿ�����%d\n",bool_num,clause_num);

    while(j<=clause_num)
    {   fscanf(fp,"%d",&t);
        i=0;
        while(t){
            q->data=t;

            i++;
            fscanf(fp,"%d",&t);
            if(t==0) break;
            q->next=(literal*)malloc(sizeof(literal));

            q=q->next;


        }
            q->next=NULL;
            p->num=i;//���Ӿ������ֵĸ���
            if(j==clause_num) break;
            p->next=(Root)malloc(sizeof(clause));
            p=p->next;
            q=(literal*)malloc(sizeof(literal));
            p->HeadNode=q;
            j++;

    }
    p->next=NULL;
    L->num=j;

    p=L->next;
    printf("\n����������ʾÿ���Ӿ䣺\n");
    while(p!=NULL){
        q=p->HeadNode;
        while(q!=NULL){
            printf("%d ",q->data);
            q=q->next;
        }
        printf("\n");
        p=p->next;

    }

    for(i=0;i<=bool_num;i++){
        sl[i].num=0;
    }

    tp=L->next;//����ÿ�������ֵĸ���
    while(tp!=NULL){
        tq=tp->HeadNode;
        while(tq!=NULL){
            if(tq->data>0){
            sl[tq->data].data=tq->data;
            sl[tq->data].num++;}
            tq=tq->next;
        }
        tp=tp->next;
    }


  /*  for(i=0;i<=bool_num;i++){
        sl_p[i]->num_sl=0;
        sl_n[i]->first=NULL;
        sl_n[i]->num_sl=0;
        sl_n[i]->first=NULL;
    }

    tp=L->next;
    i=j=0;
    while(tp!=NULL){//����ʮ������

        tq=tp->HeadNode;//�������������ֺ������

        while(tq!=NULL){
            if(tq->data>0){
                tq->same=sl_p[tq->data]->first;
                sl_p[tq->data]->first=tq;
                sl_p[tq->data]->num_sl++;
            }
            if(tq->data<0){
                tq->same=sl_n[-(tq->data)]->first;
                sl_n[-(tq->data)]->first=tq;
                sl_n[-(tq->data)]->num_sl++;

            }
            tq=tq->next;
        }
        tp=tp->next;
    }

*/
    printf("���ļ��ɹ���\n");
    fclose(fp);
    getchar();
    return OK;
}


status addClause(Root &L){
    int number;
    int i;
    int sc;
    printf("���������ӵ��Ӿ����������\n");
    scanf("%d",&number);
    Root new_clause;
    literal *n;
    new_clause=(Root)malloc(sizeof(clause));
    new_clause->num=number;

    new_clause->HeadNode=(literal*)malloc(sizeof(literal));
    n=new_clause->HeadNode;
    new_clause->next=L->next;
    L->next=new_clause;
    printf("�������������֣�\n");
    for(i=0;i<number;i++){
        scanf("%d",&sc);
        n->data=sc;

        if(i==number-1) break;
        n->next=(literal*)malloc(sizeof(literal));
        n=n->next;
    }
    n->next=NULL;

    literal *q=new_clause->HeadNode;
 /*   while(q!=NULL){
         if(q->data>0){
                q->same=sl_p[q->data]->first;
                sl_p[q->data]->first=q;
                sl_p[q->data]->num_sl++;
            }
         if(q->data<0){
                q->same=sl_n[-(q->data)]->first;
                sl_n[-(q->data)]->first=q;
                sl_n[-(q->data)]->num_sl++;

            }
        q=q->next;
    }*/
    L->num++;//�־������һ
    clause_num++;
    printf("�����Ӿ�ɹ���\n");
    return OK;

}

status removeClause(Root &L,ElemType e){//ɾ����������e���Ӿ�
    Root p=L->next;
    Root p1=L;
    Root p2;
    if(p==NULL) return ERROR;
  /*  if(e>0) sl_p[e]->first=NULL;
    if(e<0) sl_n[-e]->first=NULL;*/
    literal *q,*rq;
    while(p!=NULL){
        q=p->HeadNode;
        while(q!=NULL){
            if(q->data==e){
                q=p->HeadNode;
                while(q!=NULL){
                  rq=q; q=q->next; free(rq);
                }
                p1->next=p->next;
                p->HeadNode=NULL;
                p2=p;
                p=p->next;

                L->num--;//�Ӿ�����һ
                clause_num--;
                free(p2);
                if(p==NULL) return OK;
                q=p->HeadNode;
                break;
            }
            q=q->next;
        }
        if(q==NULL)
        {p1=p;
        p=p->next;}
    }

    return OK;

}

status removeLiteral(Root &L,ElemType e){//ɾ��ÿ���Ӿ��е�����e
    Root p=L->next;
    if(p==NULL) return ERROR;
 /*   if(e>0) sl_p[e]->first=NULL;
    if(e<0) sl_n[-e]->first=NULL;*/
    literal *q,*q1,*q2;
    while(p!=NULL){
        q=p->HeadNode;
        q1=p->HeadNode;
        while(q!=NULL){
            if(q->data==e){
                if(q==p->HeadNode){
                p->HeadNode=q->next;q2=q;
                q=q->next;free(q2);}
                else {q1->next=q->next;q2=q;q=q->next;free(q2);}
                p->num--;//��������һ
                }
            else {q1=q;q=q->next;}
        }
        p=p->next;

    }
    return OK;
}

Root simplify(Root L,ElemType e){//����eΪ�棬����L������ָ�����Ӿ伯��ָ��
    /*copy_formula[copy_num]=L;*/
    Root p=L;
    literal *q;
    Root newL;
    newL=(Root)malloc(sizeof(clause));//�������ͷ���
    newL->num=L->num;

    newL->HeadNode=NULL;
    newL->next=NULL;
    Root newp=newL;
    literal *newq;
    p=p->next;
    while(p!=NULL){
        newp->next=(Root)malloc(sizeof(clause));
        newp=newp->next;

        newp->HeadNode=NULL;newp->next=NULL;
        newp->num=p->num;
        q=p->HeadNode;
        newp->HeadNode=(literal*)malloc(sizeof(literal));
        newq=newp->HeadNode;
        while(q!=NULL){
            newq->data=q->data;

            if(q->next==NULL) {newq->next=NULL;break;}
            newq->next=(literal*)malloc(sizeof(literal));
           newq=newq->next;
           q=q->next;
        }
        p=p->next;

    }//���Ƴ�һ���µĹ�ʽ
    newp->next=NULL;
    removeClause(newL,e);
    removeLiteral(newL,-e);
    result[absoluteValue(e)]=e;

   /* copy_num++;
    copy_formula[copy_num]=newL;*/
    return newL;



}



status isUnitClause(Root &p){//�ж��Ƿ�Ϊ���Ӿ�
    if(p==NULL) return ERROR;
    if(p->num==1) return OK;
}

status EmptyClause(Root L){//�Ƿ��п��Ӿ�
    Root p=L->next;
    while(p!=NULL){
        if(p->num==0) return ERROR;//���п��Ӿ䣬��������
        p=p->next;
    }
    return OK;
}

Root findunit(Root L){
    Root p=L->next;
    while(p!=NULL){
        if(p->num==1)
            return p;
        p=p->next;
    }
    return NULL;//�޵��Ӿ�

}

ElemType optimize(Root L){
    if(L->num==0) return ERROR;
    if(L->num==1) return L->next->HeadNode->data;

  Root p=L->next;
  Root tp=p->next;
  while(tp!=NULL){
    if(tp->num<p->num){
        p=tp;

    }
    tp=tp->next;
  }


  return p->HeadNode->data;


}

status DPLL(Root L){
    Root tp=L->next;
    if(tp==NULL) return TRUE;
    if(!EmptyClause(L)) return FALSE;
    while((tp=findunit(L))!=NULL){
        ElemType w=tp->HeadNode->data;
        removeClause(L,w);
        removeLiteral(L,-w);
        result[absoluteValue(w)]=w;
        if(L->num==0) return TRUE;
        else if(!EmptyClause(L)) {return FALSE;}
    }
    ElemType v=optimize(L);
    if(DPLL(simplify(L,v))) return TRUE;//����vΪ��
    else return (DPLL(simplify(L,-v)));


}

status savefile(Root L,int t,int r){
    int i;

    FILE *fp;

    char filename2[100];
    printf("Ϊ������ļ�����(��չ��Ϊ.res)��\n");
    scanf("%s",filename2);
    fp=fopen(filename2,"w");
    if(!fp) return ERROR;

    if(r==0) {fprintf(fp,"%c ",'s');fprintf(fp,"%d\n",0);fprintf(fp,"t %d",t);printf("�����ļ��ɹ���\n");fclose(fp);return OK;}
    fprintf(fp,"%c ",'s');fprintf(fp,"%d\n",1);
    fprintf(fp,"%c ",'v');
    for(i=1;i<=bool_num;i++){
        if(result[i]!=0)
        fprintf(fp,"%d ",result[i]);
    }
    fprintf(fp,"\nt %d",t);
    fclose(fp);
    printf("�����ļ��ɹ���\n");
    return OK;

}


status display(Root &L){
    Root p=L->next;
    literal *q;
    if(p==NULL) return ERROR;
    while(p!=NULL){
        q=p->HeadNode;
        while(q!=NULL){
            printf("%d ",q->data);
            q=q->next;
        }
        printf("\n");
        p=p->next;

    }
    printf("�Ӿ���Ϊ��%d\n",L->num);
    return OK;
}

status transformcnf(int s[9][9]){
    int i,j,d,k,l;
    int zero=0;
    int bonum=1000;
    int clanum=0;
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            if(s[i][j]!=0) clanum++;
        }
    }
    clanum=clanum+10287;

    FILE *fp;
    char filename[100];
    printf("��Ϊ����������cnf�ļ�������\n");
    scanf("%s",filename);
    if(!(fp=fopen(filename,"w"))) return ERROR;
    fprintf(fp,"%c ",'p');
    fprintf(fp,"%s ","cnf");
    fprintf(fp,"%d %d\n",bonum,clanum);
    //fprintf//��д���Ԫ�����Ӿ���
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
                if(s[i][j]!=0)//�Ѹ�������,��Ϊ���Ӿ�
                {fprintf(fp,"%d %d\n",100*(i+1)+10*(j+1)+s[i][j],zero);}

        }
    }

    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            for(d=1;d<=9;d++){
                fprintf(fp,"%d ",100*(i+1)+10*(j+1)+d);
            }
            fprintf(fp,"%d\n",zero);
        }
    }

     for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            for(k=1;k<9;k++){
                for(l=k+1;l<=9;l++){
                    fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+k));
                    fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+l));
                    fprintf(fp,"%d\n",zero);
                }

            }

        }
    }

    //ÿ�п����㣺
    for(i=0;i<9;i++){
         for(k=0;k<8;k++){
            for(l=k+1;l<9;l++){
                for(d=1;d<=9;d++){
                    fprintf(fp,"%d ",-(100*(i+1)+10*(k+1)+d));
                    fprintf(fp,"%d ",-(100*(i+1)+10*(l+1)+d));
                    fprintf(fp,"%d\n",zero);
                }
            }
         }

    }

    //ÿ�п�����
       for(j=0;j<9;j++){
         for(k=0;k<8;k++){
            for(l=k+1;l<9;l++){
                for(d=1;d<=9;d++){
                    fprintf(fp,"%d ",-(100*(k+1)+10*(j+1)+d));
                    fprintf(fp,"%d ",-(100*(l+1)+10*(j+1)+d));
                    fprintf(fp,"%d\n",zero);
                }
            }
         }

    }

    //ÿ��С�����������

    for(i=1;i<=7;i=i+3){
        for(j=1;j<=7;j=j+3){
    /*for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*j+d));
        fprintf(fp,"%d ",-(100*i+10*(j+1)+d));
        fprintf(fp,"%d\n",zero);
    }
    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*j+d));
        fprintf(fp,"%d ",-(100*i+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }
     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*j+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }*/

    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*j+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }

      for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*j+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }

    /* for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*j+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }*/

     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*j+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }

     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*j+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }//8��


    /*  for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*i+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }*/

      for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }

    /*for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }*/

     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }

     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }

    /* for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }*/

     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }//7

     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }

     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }

   /* for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }*/

    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }

    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }

   /* for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*i+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }//6*/

   /* for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*j+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }

    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*j+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }

    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*j+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }*/
    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*j+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }
    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*j+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }//5

    /*for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }*/

    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }

    /*for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }*/
     for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }//4

      for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*j+d));
         fprintf(fp,"%d\n",zero);
    }
      for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }
   /* for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+1)+10*(j+2)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }//3

    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+2)+10*j+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+1)+d));
         fprintf(fp,"%d\n",zero);
    }
   for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+2)+10*j+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }//2
    for(d=1;d<=9;d++){
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+1)+d));
        fprintf(fp,"%d ",-(100*(i+2)+10*(j+2)+d));
         fprintf(fp,"%d\n",zero);
    }//1*/
    }}


    fclose(fp);
    return OK;





}

int main()
{
    Root formula;
    copy_formula=(Root*)malloc(100*sizeof(clause*));
    int op_1=1;
    int op_2=1;

    int t;

    while(op_1==1)
    {

	printf("��ѡ��SAT����������Ϸ��\n1��SAT���\n0:������Ϸ\n");
	scanf("%d",&op_2);
	if(op_2==0) break;
    getchar();
    while(op_2){
        system("cls");
        printf("\n");
        printf("-------------------------------------------------\n");
        printf("    1.OpenFile                    2.DPLLsolve\n");
        printf("    3.addClause                   4.removeClause\n");
        printf("    5.simplify                    6.display  \n");
        printf("    7.removeLiteral               0.exit\n");
        printf("-------------------------------------------------\n");
        printf("   ��ѡ����Ĳ���0-8��\n");
        scanf("%d",&op_2);
        switch(op_2){

        case 1://�����Ӿ�

            OpenFile(formula);

            getchar();
            break;



        case 3:
            addClause(formula);
            getchar();
            getchar();
            break;

        case 4:
            printf("����ɾ�������ĸ����ֵ��Ӿ䣿\n");
            scanf("%d",&t);
            if(removeClause(formula,t))
                printf("ɾ���Ӿ�ɹ���\n");
            else printf("���Ӿ伯Ϊ�գ�ɾ��ʧ�ܣ�\n");
            getchar();
            getchar();
            break;

        case 6:
            if(!display(formula))
            printf("���Ӿ伯Ϊ�գ�\n");
            getchar();
            getchar();
            break;

        case 7:
            int e;
            printf("��������Ҫɾ�������֣�\n");
            scanf("%d",&e);
            if(removeLiteral(formula,e)) printf("ɾ���ɹ�\n");
            else printf("ɾ��ʧ��\n");
            getchar();
            getchar();
            break;

        case 2:
            int i,re;
            clock_t start,finish;
            double thetime;
            start=clock();
            re=DPLL(formula);
            finish=clock();
            thetime=(double)(finish-start);
            if(re==0)
               printf("s 0\n");
            else {
                    printf("s 1\n");
                    printf("v ");
                    for(i=1;i<=bool_num;i++){
                        printf("%d ",result[i]);
                        }
                    printf("\n");

            }
            printf("t %f\n",thetime);
            int o;
            printf("�Ƿ񱣴��ļ���1����  2��\n");
            scanf("%d",&o);
            if(o=1) savefile(formula,thetime,re);
            getchar();
            getchar();
            break;

        case 5:
            int k;
            Root newL;
            printf("��������Ҫ��������֣�\n");
            scanf("%d",&k);
            newL=simplify(formula,k);
            printf("����ɹ�\n");
            display(newL);
            getchar();
            getchar();
            break;

        case 0:
            getchar();
            break;



        }//end of switch
    }//end of while(op_2),֮��Ӧ��Ϊ������Ϸ
    }//end of while(op_1)

    int sudo[9][9];
    sudo[0][0]=3;sudo[0][1]=2;sudo[0][2]=1;sudo[0][3]=4;sudo[0][4]=5;sudo[0][5]=6;sudo[0][6]=7;sudo[0][7]=8;sudo[0][8]=9;
    sudo[1][0]=6;sudo[1][1]=5;sudo[1][2]=4;sudo[1][3]=7;sudo[1][4]=8;sudo[1][5]=9;sudo[1][6]=1;sudo[1][7]=2;sudo[1][8]=3;
    sudo[2][0]=9;sudo[2][1]=8;sudo[2][2]=7;sudo[2][3]=1;sudo[2][4]=2;sudo[2][5]=3;sudo[2][6]=4;sudo[2][7]=5;sudo[2][8]=6;
    sudo[3][0]=4;sudo[3][1]=1;sudo[3][2]=2;sudo[3][3]=3;sudo[3][4]=6;sudo[3][5]=5;sudo[3][6]=8;sudo[3][7]=9;sudo[3][8]=7;
    sudo[4][0]=5;sudo[4][1]=6;sudo[4][2]=3;sudo[4][3]=8;sudo[4][4]=9;sudo[4][5]=7;sudo[4][6]=2;sudo[4][7]=1;sudo[4][8]=4;
    sudo[5][0]=7;sudo[5][1]=9;sudo[5][2]=8;sudo[5][3]=2;sudo[5][4]=1;sudo[5][5]=4;sudo[5][6]=3;sudo[5][7]=6;sudo[5][8]=5;
    sudo[6][0]=1;sudo[6][1]=3;sudo[6][2]=5;sudo[6][3]=6;sudo[6][4]=4;sudo[6][5]=2;sudo[6][6]=9;sudo[6][7]=7;sudo[6][8]=8;
    sudo[7][0]=2;sudo[7][1]=4;sudo[7][2]=6;sudo[7][3]=9;sudo[7][4]=7;sudo[7][5]=8;sudo[7][6]=6;sudo[7][7]=2;sudo[7][8]=1;
    sudo[8][0]=8;sudo[8][1]=7;sudo[8][2]=9;sudo[8][3]=5;sudo[8][4]=3;sudo[8][5]=1;sudo[8][6]=5;sudo[8][7]=4;sudo[8][8]=2;
    int c,i,j,k;
    int sudoresult[9][9];
    for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            sudoresult[i][j]=sudo[i][j];
        }
    }

    srand(time(NULL));

    int limit=5;
    for(i=0;i<9;i++){
    for(k=0;k<limit;k++)
        {
        c=rand()%9;
        sudo[i][c]=0;
        }
    }
    printf("������ʾһ���������̣�\n");
    for(i=0;i<9;i++){
        for(k=0;k<9;k++){
            printf("%d\t",sudo[i][k]);

        }
        printf("\n");
    }


    if(!transformcnf(sudo))
    {printf("�����ļ�ʧ�ܣ�\n");return 0;}
    printf("������ת��ΪSAT����,���������Ѵ�����cnf�ļ���\n���enter���ļ�������SAT��������\n");
    getchar();
    getchar();
    Root formula2;
    OpenFile(formula2);//�����cnf�ļ�
    int temp;
    int r2;
    long thetime2;
            clock_t start2,finish2;
            double thetime;
            start2=clock();
            r2=DPLL(formula2);
            finish2=clock();
            thetime2=(double)(finish2-start2);

        /*printf("�Ƿ�Ҫ����cnf�ļ�����������\n1���� 2����");
        scanf("%d",&temp);
        if(temp==1) {savefile(formula2,thetime2,r2);}*/
        printf("���enter�鿴�𰸣�\n");
        getchar();
        getchar();
        for(i=0;i<9;i++){
        for(j=0;j<9;j++){
            printf("%d ",sudoresult[i][j]);
        }
        printf("\n");
    }









return 0;
}//end of main
