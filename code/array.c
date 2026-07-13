#include <stdio.h>
#include <conio.h>
#include <stdlib.h>

#define lower_bound 1
#define upper_bound 5
#define lower_bound1 1
#define upper_bound1 3
#define lower_bound2 1
#define upper_bound2 4
#define lower_bound3 1
#define upper_bound3 5

int *BaseAdd1, *BaseAdd2, *BaseAdd3, *p;
int i, j, k;

// 1-D Array
void Create1DArray() {
    int element, c, total_mem;

    element = (upper_bound - lower_bound + 1);
    c = sizeof(*BaseAdd1);
    total_mem = element * c;
    BaseAdd1 = (int *)malloc(total_mem);
}

void A1(int i, int x) {
    p = BaseAdd1 + (i - lower_bound);
    *p = x;
}

void ReadA1(int i) {
    p = BaseAdd1 + (i - lower_bound);

    int offset = p - BaseAdd1;

    printf("Base   = %p\n", (void *)BaseAdd1);
    printf("p      = %p\n", (void *)p);

    printf("Base (dec) = %llu\n", (unsigned long long)BaseAdd1);
    printf("p    (dec) = %llu\n", (unsigned long long)p);

    printf("Offset = %td [0x%tX]\n", offset, (unsigned)offset);
    printf("Value  = %d\n", *p);
    printf("Byte Off : %d * 4 = %td\n", offset, (char *)p - (char *)BaseAdd1);
}

// 2-D Array
void Create2DArray() {
    int element, c, total_mem;

    element = (upper_bound1 - lower_bound1 + 1) *
              (upper_bound2 - lower_bound2 + 1);

    c = sizeof(*BaseAdd2);
    total_mem = element * c;
    BaseAdd2 = (int *)malloc(total_mem);
}

void A2(int i, int j, int x) {
    p = BaseAdd2 + 
        (i - lower_bound1) * (upper_bound2 - lower_bound2 + 1) + 
        (j - lower_bound2);

    *p = x;
}

void ReadA2(int i, int j) {
    p = BaseAdd2 +
        (i - lower_bound1) * (upper_bound2 - lower_bound2 + 1) +
        (j - lower_bound2);

    int offset = p - BaseAdd2;

    printf("Base   = %p\n", (void *)BaseAdd2);
    printf("p      = %p\n", (void *)p);

    printf("Base (dec) = %llu\n", (unsigned long long)BaseAdd2);
    printf("p    (dec) = %llu\n", (unsigned long long)p);

    printf("Offset = %td [0x%tX]\n", offset, (unsigned)offset);
    printf("Value  = %d\n", *p);
    printf("Byte Off : %d * 4 = %td\n", offset, (char *)p - (char *)BaseAdd2);
}

// 3-D Array
void Create3DArray() {
    int element, c, total_mem;

    element = (upper_bound1 - lower_bound1 + 1) *
              (upper_bound2 - lower_bound2 + 1) *
              (upper_bound3 - lower_bound3 + 1);

    c = sizeof(*BaseAdd3);
    total_mem = element * c;
    BaseAdd3 = (int *)malloc(total_mem);
}

void A3(int i, int j, int k, int x) {
    p = BaseAdd3 +
        (i - lower_bound1) *
        (upper_bound2 - lower_bound2 + 1) *
        (upper_bound3 - lower_bound3 + 1) +
        (j - lower_bound2) *
        (upper_bound3 - lower_bound3 + 1) +
        (k - lower_bound3);

    *p = x;
}

// Plane -> Row -> Column
void ReadA3(int i, int j, int k) {
    int plane = (k - lower_bound1) *
                (upper_bound2 - lower_bound2 + 1) *
                (upper_bound3 - lower_bound3 + 1);

    int row = (j - lower_bound2) *
              (upper_bound3 - lower_bound3 + 1);

    int col = (i - lower_bound3);

    int offset = plane + row + col;

    printf("Base   = %p\n", (void *)BaseAdd3);
    printf("p      = %p\n", (void *)p);

    printf("Base (dec) = %llu\n", (unsigned long long)BaseAdd3);
    printf("p    (dec) = %llu\n", (unsigned long long)p);

    printf("Offset = %d + %d + %d = %d elements\n",
           plane, row, col, offset);

    printf("Offset = %td [0x%tX]\n", offset, (unsigned)offset);
    printf("Value  = %d\n", *p);
    printf("Byte Off : %d * 4 = %td\n",
           offset, (char *)p - (char *)BaseAdd3);
}

// Column -> Row -> Plane
void A3_added(int i, int j, int k, int x) {
    p = BaseAdd3 +
        (k - lower_bound3) *
        (upper_bound2 - lower_bound2 + 1) *
        (upper_bound1 - lower_bound1 + 1) +
        (j - lower_bound2) *
        (upper_bound1 - lower_bound1 + 1) +
        (i - lower_bound1);

    *p = x;
}

void ReadA3_added(int i, int j, int k) {
    int plane = (k - lower_bound3) *
                (upper_bound2 - lower_bound2 + 1) *
                (upper_bound1 - lower_bound1 + 1);

    int row = (j - lower_bound2) *
              (upper_bound1 - lower_bound1 + 1);

    int col = (i - lower_bound1);

    int offset = plane + row + col;

    printf("\nBase   = %p\n", (void *)BaseAdd3);
    printf("p      = %p\n", (void *)p);

    printf("Base (dec) = %llu\n", (unsigned long long)BaseAdd3);
    printf("p    (dec) = %llu\n", (unsigned long long)p);

    printf("Offset = %d + %d + %d = %d elements\n",
           plane, row, col, offset);

    printf("Offset = %td [0x%tX]\n", offset, (unsigned)offset);
    printf("Value  = %d\n", *p);
    printf("Byte Off : %d * 4 = %td\n",
           offset, (char *)p - (char *)BaseAdd3);
}

int main() {
    Create1DArray();
    Create2DArray();
    Create3DArray();

    i = 2;
    A1(i, 9);
    printf("\nA1(%d)\n", i);
    ReadA1(i);

    i = 2;
    j = 3;
    A2(i, j, 99);
    printf("\nA2(%d, %d)\n", i, j);
    ReadA2(i, j);

    i = 3;
    j = 4;
    k = 5;
    A3(i, j, k, 999);
    printf("\nPlane -> Row -> Column\n");
    printf("A3(%d, %d, %d)\n", i, j, k);
    ReadA3(i, j, k);

    i = 1;
    j = 3;
    k = 2;
    A3_added(i, j, k, 999);
    printf("\nColumn -> Row -> Plane\n");
    printf("A3(%d, %d, %d)\n", i, j, k);
    ReadA3_added(i, j, k);

    getch();

    free(BaseAdd1);
    free(BaseAdd2);
    free(BaseAdd3);

    return 0;
}